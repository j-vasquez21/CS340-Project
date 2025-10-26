# Example Python Code to Insert a Document 
# Jerry Vasquez

from pymongo import MongoClient
from pymongo.errors import PyMongoError

from bson.objectid import ObjectId 

class AnimalShelter(object): 
    """ CRUD operations for Animal collection in MongoDB """ 

    def __init__(self, user, password, host, port, db, col): 
        # Initializing the MongoClient. This helps to access the MongoDB 
        # databases and collections. This is hard-wired to use the aac 
        # database, the animals collection, and the aac user. 

        # You must edit the password below for your environment. 

        # Connection Variables 
        # USER = 'aac'
        # PASS = 'mongoDBisFun2025'
        # HOST = 'localhost' 
        # PORT = 27017 
        # DB = 'aac' 
        # COL = 'animals' 
        
        self.user = user 
        self.password = password
        self.host = host
        self.port = port
        self.db = db
        self.col = col

        # Initialize Connection 
        
        self.client = MongoClient('mongodb://%s:%s@%s:%d' % (self.user,self.password,self.host,self.port)) 
        self.database = self.client['%s' % (self.db)] 
        self.collection = self.database['%s' % (self.col)] 

    # Create a method to return the next available record number for use in the create method
            
    # CREATE METHOD
    def create(self, data):
        # must not be null be a dictionary
        if data is not None and isinstance(data, dict): 
            # pymongo doc: insert_one() returns an instance of InsertOneResult
            result = self.database.animals.insert_one(data)
            # pymongo doc: InsertOneResult has boolean attribute, acknowledged
            return result.acknowledged
        else: 
            raise Exception("Nothing to save, because data parameter is empty or data is not a dictionary") 

    # READ METHOD
    def read(self, query):
        # query type checking
        if query is None or not isinstance(query, dict):
            raise TypeError("The query is empty or is not a dictionary")
        try:
            # self note: a cursor is an object that references the documents returned by a query
            cursor = self.collection.find(query)
            # return as list 
            return list(cursor)
        # if breaks, save error into e
        except PyMongoError as e:
            # display error
            print(f"The following error has occurred while querying: {e}")
            # unsuccessful read returns an empty list
            return []
    
    # UPDATE METHOD
    # Implements update_one functionality by default
    # Toggle many parameter to true to implement update_many functionality
    def update(self, query, modifications, many=False):
        # query and modifications must be in dictionary form
        if not isinstance(query, dict) or not isinstance(modifications, dict):
            raise TypeError("The query or modifications is not in the right format.")
        
        try:
            if many:
                result = self.collection.update_many(query, {"$set" : modifications})
            else:
                result = self.collection.update_one(query, {"$set" : modifications})    
            # from pymongo docs, result is UpdateResult object with modified_count attribute
            return result.modified_count
        
        except PyMongoError as e:
            # display error
            print(f"The following error has occurred while updating: {e}")
            return 0 # no collections updated
        
    
    # DELETE METHOD
    # Implements delete_one functionality by default
    # Toggle many parameter to true to implement delete_many functionality
    def delete(self, query, many=False):
        # query and modifications must be in dictionary form
        if not isinstance(query, dict):
            raise TypeError("The query is not in the right format.")
        
        try:
            if many:
                result = self.collection.delete_many(query)
            else:
                result = self.collection.delete_one(query)    
            # from pymongo docs, result is DeleteResult object with deleted_count attribute
            return result.deleted_count
        
        except PyMongoError as e:
            # display error
            print(f"The following error has occurred while deleting: {e}")
            return 0 # no collections deleted