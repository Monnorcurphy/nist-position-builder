import sqlite3
import sys
#a utility script was used "xlsx_util" to build the database. This file is provided to show table structure.

def init_db():
	print("initializing workforce.db")
	conn = sqlite3.connect("workforce.db")
	c = conn.cursor()
	c.execute("CREATE TABLE statements (id, type, text)")
	c.execute('''CREATE TABLE work_roles (id, type, title, description)''')
	c.execute('''CREATE TABLE relationships 
				(relationship_id INTEGER PRIMARY KEY AUTOINCREMENT, work_role_id, statement_id,
					CONSTRAINT fk_work_role_id
						FOREIGN KEY (work_role_id)
						REFERENCES work_roles(id), 
					CONSTRAINT fk_statement_id
						FOREIGN KEY (statement_id)
						REFERENCES statements(id))''')
	conn.commit()
	conn.close()

def query_db(query):
	conn = sqlite3.connect("workforce.db")
	c = conn.cursor()
	c.execute('SELECT * FROM relationships')
	print(c.fetchall())
	conn.close()

def insert_statements(path, sheet_name, statement_type):
	#get cursor
	conn = sqlite3.connect("workforce.db")
	c = conn.cursor()
	#get objects from spreadsheet
	objects = xlsx_util.objectify_sheet(path, sheet_name)
	for obj in objects:
		#insert object into db
		#TODO: parameterize "statement type" and where the "statement text" is
		c.execute("INSERT INTO statements VALUES (?,?,?)",(obj["ID"],statement_type,obj["Ability"]))
	conn.commit()
	conn.close()

def insert_workroles(path, sheet_name, workrole_type):
	print("Inserting Work Roles")
	conn = sqlite3.connect("workforce.db")
	c = conn.cursor()
	#get objects from spreadsheet
	objects = xlsx_util.objectify_sheet(path, sheet_name)
	for obj in objects:
		#insert object into db
		c.execute('''INSERT INTO work_roles VALUES (?,?,?,?)''',
					(obj["ID"],workrole_type, obj["Work Role"], obj["Work Role Description"]))
	conn.commit()
	conn.close()

def insert_relationships(path, sheet_name):
	print("Inserting relationships")
	conn = sqlite3.connect("workforce.db")
	c = conn.cursor()
	objects = xlsx_util.objectify_sheet(path, sheet_name)
	for obj in objects:
		c.execute('''INSERT INTO relationships (work_role_id, statement_id) VALUES (?,?)''',
					(obj["Work Role ID"], obj["KSAT ID"]))
	conn.commit()
	conn.close()


if __name__ == "__main__":
	print("Worforce Database Program Running")
