import streamlit as st
from streamlit_chat import message
import pandas as pd
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import jsonify
from flask import Flask, render_template, jsonify, request
import json
from flask_cors import CORS, cross_origin

model = SentenceTransformer('jhgan/ko-sroberta-multitask')

sentences = ["심리상담챗봇입니다.", "한국어 문장 임베딩을 위한 버트 모델입니다."]
embeddings = model.encode(sentences)

df = pd.read_csv('wellness_dataset_original.csv')
df = df.drop(columns=['Unnamed: 3'])
df = df[~df['챗봇'].isna()]
df.loc[0, '유저']
model.encode(df.loc[0, '유저'])
df['embedding'] = pd.Series([[]] * len(df)) # dummy

df['embedding'] = df['유저'].map(lambda x: list(model.encode(x)))
df.to_csv('wellness_dataset.csv', index=False)





app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/answer/<data>', methods=['GET'])
def answer(data):
    text = data

    embedding = model.encode(text)
    df['distance'] = df['embedding'].map(lambda x: cosine_similarity([embedding], [x]).squeeze())
    df.tail()
    answer = df.loc[df['distance'].idxmax()]
    # print(answer['챗봇'])
    dataa = {'code' : '200',"cal_result":answer['챗봇']}
    # return answer['챗봇']
    return jsonify(dataa) # 머신러닝 결과 반환



@app.route('/')
def home():
    data1 = {'name' : 'taekyeong'}
    return jsonify(data1)




if __name__ == '__main__':
    app.run(port=5000, debug=True)
    
    
    