from sqlalchemy.orm import sessionmaker
import sqlalchemy as db
from sqlalchemy.ext.declarative import declarative_base
from jsonschema import validate
"2020-01-01 00:00:00"
schema = {
    "type" : "object",
    "properties" : {
        "first_name" : {"type" : "string"},
        "last_name" : {"type" : "string"},
        "course" : {"type" : "string"},
        "score" : {"type" : "number","maximum":5}
    }
}


json={
    "first_name":"jan",
    "last_name":"lis",
    "course":"haha",
    "score":10
    }



#validate(instance=json, schema=schema)




Base = declarative_base()

# DEFINE THE ENGINE (CONNECTION OBJECT)
engine = db.create_engine(
    "mysql://root:AGH2022@34.118.125.45:3306/test")






# CREATE THE TABLE MODEL TO USE IT FOR QUERYING
class Students(Base):
    __tablename__ = 'Students'

    first_name = db.Column(db.String(50),primary_key=True)
    last_name = db.Column(db.String(50),primary_key=True)
    course = db.Column(db.String(50))
    score = db.Column(db.Float)


# CREATE A SESSION OBJECT TO INITIATE QUERY
# IN DATABASE
Session = sessionmaker(bind=engine)
session = Session()

student = Students(first_name="jan",last_name="kol",score=10)

result = session.add(student)
session.commit()



# SELECT all
# FROM students
result = session.query(Students)
print("Query 2:", result)


# VIEW THE ENTRIES IN THE RESULT
for r in result:
    print(r.first_name, "|", r.last_name, "|", r.course)

result = session.query(Students) \
    .filter(Students.first_name == 'jan') \
        .delete(synchronize_session=False)
print("Rows deleted:", result)