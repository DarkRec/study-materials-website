import sqlalchemy as sa
import pandas 
DbPort="1234"
DbIP="192.168.1.1"
DbLogin="login"
DbPassword="password"
POSTGRES_CONNECTION= f"postgresql://{DbLogin}:{DbPassword}@{DbIP}:{DbPort}/postgres"
engine=sa.engine.create_engine(POSTGRES_CONNECTION)

table=sa.Table("table_1",sa.MetaData(),
                        autoload=True,
                        autoload_with=engine)

query = table.select()
con= engine.connect() 
result = con.execute(query)
result_columns=con.execute(query).keys()
df=pandas.DataFrame(result,columns=result_columns)
print(df)