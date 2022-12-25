import pickle
from sklearn.neighbors import KNeighborsClassifier
import numpy as np
import pandas as pd
filename = 'finalized_model.sav'
loaded_model = pickle.load(open(filename, 'rb'))

from flask import Flask, request
import json
import joblib
# Setup flask server
app = Flask(__name__)

# Setup url route which will calculate
# total sum of array.
@app.route('/MachineLearningModel', methods = ['POST'])
def sum_of_array():
    
    data = request.get_json()
    print(data)
    df = pd.DataFrame(data)
    input_data = np.array(df).reshape(1,-1)
    for feature in train_df:
        le = preprocessing.LabelEncoder()
        le.fit(train_df[feature])
        le_name_mapping = dict(zip(le.classes_, le.transform(le.classes_)))
        train_df[feature] = le.transform(train_df[feature])
    # Get labels
    
    result = 'hello'

    # Return data in json format
    return json.dumps({"result":result})

if __name__ == "__main__":
	app.run(port=9501)
