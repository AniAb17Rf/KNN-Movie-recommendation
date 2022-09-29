import React, { Component } from 'react';
import MovieRow from './MovieRow.js'
import Faour from './fa.js'
import './App.css';
import $ from 'jquery'
const WAIT_INTERVAL = 1000;
//const ENTER_KEY = 13;
class App extends Component{
constructor(props){
  super(props)
  
  this.myRef = React.createRef();
  this.state={val:''}
  // const movies=[
  //   {id: 0, title:"Avengers Infinity War", Overview:"FUCK YOU WT,Yo Yo wassuppYo Yo wassuppYo Yo wassuppYo Yo wassuppYo Yo wassuppYo Yo wassuppYo Yo wassuppYo Yo wassuppYo Yo wassupp, "},
  //   {id: 1, title:"The Matrix", Overview:"FUCK YOU WT2,Yo Yo wassuppYo Yo wassuppYo Yo wassuppYo Yo wassuppYo Yo wassuppYo Yo wassuppYo Yo wassuppYo Yo wassuppYo Yo wassuppYo Yo wassuppYo Yo wassuppYo Yo wassuppYo Yo wassuppYo Yo wassupp"},
  // ]
  // var movieRows=[]
  // movies.forEach(movie=>{
  //   console.log(movie.title)
  //   const movieRow = <MovieRow movie={movie}/>
  
  //   movieRows.push(movieRow)
  // })
  //this.state = {rows: movieRows}
  //this.performSearch();
}


componentDidMount() {
  this.timer = null;
  this.interval=setInterval(this.favourite(),1000)
  setInterval(this.recommended(),1000)
}

handleChange(event) {
  clearTimeout(this.timer);
  const value = event.target.value
  this.setState({ val:value });
  //console.log(this.state.val)

  this.timer = setTimeout(this.triggerChange.bind(this), WAIT_INTERVAL);
}

//handleKeyDown(e) {
  //if (e.keyCode === ENTER_KEY) {
   //   this.triggerChange();
  //}
//}

triggerChange() {
  clearInterval(this.interval)

  console.log(this.state.val)
  this.setState({arr:' '})
  this.setState({favi:' '})
  this.setState({rec:' '})
  this.setState({re:' '})
  //this.refs.test.setAttribute(hidden,"hidden")
  this.performSearch(this.state.val);
}
newfun() {
  this.favourite()
  this.recommended()
  this.setState({rows:' '})
}
favourite(){
  console.log("Hi")
  this.setState({favi:"Favourite"})

  var xhr1 = new XMLHttpRequest()
  var text
  xhr1.open('GET','http://localhost:5000/ge')
  xhr1.send()
  xhr1.onreadystatechange = function () {
    if(xhr1.readyState === 4 && xhr1.status===200)
      {//console.log(xhr1.responseText)
      text=xhr1.responseText
      //var array = text.split("#");
      //console.log(array)
      var temp = text.split("%")
      var ids = temp[1]
      var tits = temp[0]
      //console.log(tits.length)
      var array = tits.split("#");
      var array1 = ids.split("$")
      //console.log(array1.length)
      var movieRows = []
       var i=0
        for(;i<array.length-1;i++)
      {    const mR = <Faour tit = {array[i]} id={array1[i]}/>
          movieRows.push(mR)}
        this.setState({arr:movieRows})
       //console.log(this.state.arr[1])
    }

}.bind(this)

}

componentWillUnmount(){
  clearInterval(this.interval)
}
    
  
// }
performSearch(searchTerm){
  const urlString = "https://api.themoviedb.org/3/search/movie?api_key=f005b3c7dc694c675cffd4b661e28222&query="+ searchTerm
  $.ajax({url : urlString,
  success : (searchResults) => {
    console.log("Fetched data successfully")
    const results = searchResults.results
    //console.log(results[0])
    var movieRows = []

    results.forEach((movie) => {
      movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
      //console.log(movie.title)
      const movieRow = <MovieRow movie={movie}/>
      movieRows.push(movieRow)
    })
    this.setState({rows: movieRows})

  },
  error : (xhr,status, err) => {
    console.error("failed to get data")
  }
})

}

recommended(){
  this.setState({re:"Recommended movies"})

  var xhr1 = new XMLHttpRequest()
  var text
  xhr1.open('GET','http://localhost:5000/re')
  xhr1.send()
  xhr1.onreadystatechange = function () {
    if(xhr1.readyState === 4 && xhr1.status===200)
      {//console.log(xhr1.responseText)
      text=JSON.parse(xhr1.responseText)
      /*var final_text = text.split("#")
      var genre_list = final_text[1]
      var min = final_text[0]
      var final = genre_list+'&vote_average.gte='+min
      //console.log(text)
      const urlString = "https://api.themoviedb.org/3/discover/movie?api_key=f005b3c7dc694c675cffd4b661e28222&language=en-US&sort_by=popularity.desc&with_genres="+ final
  $.ajax({url : urlString,
  success : (searchResults) => {
    console.log("Fetched data successfully")
    const results = searchResults.results*/
    console.log(text)
    var movieRows = []
    var i=0
     for(;i<3;i++){
      text[i].poster_src = "https://image.tmdb.org/t/p/w185" + text[i].poster_path
      //console.log(movie.title)
      const movieRow = <MovieRow movie={text[i]}/>
      movieRows.push(movieRow)
    }
    this.setState({rec: movieRows})
  }
  /*},
  error : (xhr,status, err) => {
    console.error("failed to get data")
  }
})

}*/
}.bind(this)

}
// searchChangeHandler(event){
//   const boundObject = this
//   const searchTerm = event.target.value
//   boundObject.performSearch(searchTerm)}
render() {
  return (
    <div className="App">
    <table className="titleBar">
      <tbody>
        <tr>
          <td style={{fontSize:12 }}>Powered by <br/><br/>
            <img alt="NW" width="65" src="tmdb.svg"/>

          </td>
          <td width="8"/>
          <td style={{fontSize:36,
            paddingLeft:500}}>
            <i>Hookd</i>
          </td>
        </tr>
      </tbody>
    </table>
    <br/>
    <input type="text" class="form-control" style={{
      backgroundColor:"#04d9a4",
      display:"block",
      width:"99%",
      color:"#fff",
      paddingLeft:16,
      paddingTop:8,
      paddingBottom:8,
      fontSize:20,
      borderStyle:"groove",
      borderColor:"#04d9a4"
    }}
     
    value={this.state.val}
                onChange={this.handleChange.bind(this)}              
                placeholder="Enter search term"/>
    <br/>
    <input type="button" onClick={this.newfun.bind(this)} class="btn btn-primary" value="Home"/>
    <i style={{color:"#04d9a4"}} align="left"><h3><u>{this.state.favi}</u><br/></h3></i>
    {this.state.arr}
    <br/>
    <i style={{color:"#04d9a4"}} align="left"><h3><u>{this.state.re}</u><br/></h3></i>
    {this.state.rec}
    {this.state.rows}
    </div>
  );
}
}
export default App;
