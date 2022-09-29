from flask import Flask, render_template,jsonify,request,abort,Response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import statistics
import requests
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/mydatabase'
db = SQLAlchemy(app)
CORS(app)

class movie(db.Model):
    __tablename__ = 'movie'
    id = db.Column('movie_id', db.Integer,primary_key=True)
    title = db.Column('movie_title', db.Unicode)
    genre = db.Column('movie_genre', db.Unicode)
    vote = db.Column('movie_vote', db.Float)
    def  __init__(self, id, title, genre, vote):
        self.id = id
        self.title = title
        self.genre = genre
        self.vote = vote

@app.route('/mov',methods=["POST"])
def add_movie():

    title = request.get_json(force=True)["title"]
    id = request.get_json(force=True)["id"]
    gen  =request.get_json(force=True)["genre"]
    vote =request.get_json(force=True)["vote_avg"]
    #new_ex = movies(id,title)
    #print(gen)
    db.session.add(movie(id,title,gen,vote))
    db.session.commit()
    return "success"

@app.route('/del',methods=["POST"])
def del_movie():
    id = request.get_json(force=True)["id"]
    mov = movie.query.get(id)
    db.session.delete(mov)
    db.session.commit()

@app.route('/ge',methods=['GET'])
#@cross_origin()
def get_movie():

    ex=movie.query.all()
    lis = ""
    for e in ex:
        lis=lis+str(e.title)+"#"
    lis = lis + "%"
    for e in ex:
        lis=lis+str(e.id)+"$" 
    #print(lis)
    return(lis)

@app.route('/re',methods=['GET'])
#@cross_origin()
def recommend():
    vote_list = db.session.query(movie).all()
    vote_list = [movi.vote for movi in vote_list]
    avg = statistics.mean(vote_list)
    std_v = statistics.stdev(vote_list)
    mini = avg-std_v/2
    result = db.engine.execute("SELECT movie_genre FROM movie GROUP BY movie_genre ORDER BY COUNT(*) DESC LIMIT 3;")
    #print(result)
    res = []
    counts = []
    for rowproxy in result:
        #print(rowproxy.items)
        for column,value in rowproxy.items():
            cont = db.engine.execute("SELECT COUNT(*) FROM movie WHERE movie_genre="+str(value)+";")
            for rproxy in cont:
                print(rproxy.items()[0][1])
                count = rproxy.items()[0][1]
            res.append(value)
            counts.append(count)
    
    result = requests.get("https://api.themoviedb.org/3/discover/movie?api_key=f005b3c7dc694c675cffd4b661e28222&language=en-US&sort_by=popularity.desc&vote_average.gte="+str(mini)+"&with_genres="+str(res[0]))
    res_json = result.json()
    i=0
    scores = []
    result_mod = []
    print(type(res_json["results"]))
    for i in range(10):
        result_mod.append(res_json["results"][i])
    print(type(result_mod[0]))
    for i in range(10):
        score = 0
        for x in result_mod[i]["genre_ids"]:
            if(res[0]==x):
                score = score + counts[0]
            if(res[1]==x):
                score = score + counts[1]
            if(res[2]==x):
                score = score + counts[2]
        scores.append(score)
    index = range(10)
    sco_fin = sorted(index, reverse = True, key=lambda i: scores[i])
    sco_fin = sco_fin[:3]
    #    for x in res_json["results"][i]["genre_ids"]:
    #        if(counts[0])
    #final_res = [x for _,x in sorted(zip(scores,result_mod))]
    result_mod_final = []
    result_mod_final.append(result_mod[sco_fin[0]])
    result_mod_final.append(result_mod[sco_fin[1]])
    result_mod_final.append(result_mod[sco_fin[2]])
    print(scores)
    print(result_mod_final)
    return jsonify(result_mod_final)
