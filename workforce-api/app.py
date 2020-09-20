import sqlite3
from flask import g
from flask import render_template
from flask import jsonify
from flask import request
from flask import Flask
app = Flask(__name__)

DATABASE = 'workforce.db'
print("hello")

def post_statement(form):
	print(form)
	return "Your post is being tested"
def make_dicts(cursor, row):
	return dict((cursor.description[idx][0], value) for idx, value in enumerate(row))

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = sqlite3.Row
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def query_db(query, args=(), one=False):
	#print(args)
	cur = get_db().execute(query, args)
	rv = cur.fetchall()
	cur.close()
	return (rv[0] if rv else None) if one else rv

@app.route('/workroles/<work_role_id>')
def show_work_role(work_role_id):
	results = []
	work_role = query_db('''SELECT * from work_roles where id = ?''',args=[work_role_id])
	statements = query_db('''SELECT * from statements where id in (SELECT statement_id from relationships where work_role_id=?)''',args=[work_role_id])
	return render_template("workrole.html",work_role=work_role[0],statements=statements)

@app.route('/api/workroles')
def get_workroles():
	results = []
	for work_role in query_db('''SELECT * from work_roles where id IS NOT NULL'''):
		res = {"id":work_role['id'],
				"type":work_role["type"],
				"title":work_role["title"],
				"description":work_role["description"]}
		results.append(res)
	return jsonify(results)

# id, type, text
@app.route('/api/workrole/<work_role_id>')
def get_work_role(work_role_id):
	results = []
	work_role = query_db('''SELECT * from work_roles where id = ?''',args=[work_role_id])[0]
	statements = query_db('''SELECT * from statements where id in (SELECT statement_id from relationships where work_role_id=?)''',args=[work_role_id])
	stringifiedStatements = []
	for statement in statements:
		res = {"id":statement['id'],
				"type":statement["type"],
				"text":statement["text"]}
		stringifiedStatements.append(res)
	
	results = {"id":work_role['id'],
				"type":work_role["type"],
				"title":work_role["title"],
				"description":work_role["description"],
				"statements": stringifiedStatements}
	return jsonify(results)

@app.route('/api/statement/<statement_id>')
def get_statement(statement_id):
	
	statement = query_db('''SELECT * from statements where id=?''',args=[statement_id])[0]
	result = {"id":statement['id'],
				"type":statement["type"],
				"text":statement["text"]}
	return jsonify(result)

@app.route('/api/statements/', defaults={'statement_type': None})
@app.route('/api/statements/<statement_type>')
def get_statements_of_type(statement_type):
	if statement_type: 
		statements = query_db('''SELECT * from statements where type=?''',args=[statement_type])
	else:
		statements = query_db('''SELECT * from statements''')
	
	results = []
	for statement in statements:
		res= {"id":statement['id'],
				"type":statement["type"],
				"text":statement["text"]}
		results.append(res)
	return jsonify(results)

@app.route('/compare/<first_work_role>/<second_work_role>')
def compare_work_roles(first_work_role, second_work_role):
	work_role_one = query_db('''SELECT * from work_roles where id = ?''',args=[first_work_role])[0]
	work_role_two = query_db('''SELECT * from work_roles where id = ?''',args=[second_work_role])[0]

	ret = []
	wrs = (work_role_one,work_role_two)
	for wr in wrs:
		res = {"id":wr['id'],
		"type":wr["type"],
		"title":wr["title"],
		"description":wr["description"]}
		ret.append(res)

	first_statements = query_db('''SELECT * from statements where id in (SELECT statement_id from relationships where work_role_id=?)''',args=[first_work_role])
	second_statements = query_db('''SELECT * from statements where id in (SELECT statement_id from relationships where work_role_id=?)''',args=[second_work_role])
	common_statements= query_db('''SELECT * from statements where id in (SELECT statement_id from relationships where work_role_id = ? INTERSECT Select statement_id from relationships where work_role_id=?)''', args=[first_work_role,second_work_role])
	print(len(first_statements),len(second_statements),len(common_statements))
	return render_template("compare.html",wrs=ret,first_statements=first_statements, second_statements=second_statements, common_statements=common_statements)

@app.route('/statements')
def statements():
	print('hello')
	message = None
	if request.method == 'POST':
		message = post_statement(request.form)
	
	if not message:
		message = "Here are all the current statements." 

	return render_template("statements.html", banner_message=message)
