import React from 'react'

class MovieRow extends React.Component{
    viewMovie() {
        const url = "https://www.themoviedb.org/movie/" + this.props.movie.id
        window.location.href = url
    }
    sendFav() {
        console.log(this.props.movie.genre_ids[0])
        var xhr = new XMLHttpRequest()
        xhr.open('POST', 'http://localhost:5000/mov')
        xhr.send(JSON.stringify({ title: this.props.movie.title, id:this.props.movie.id, genre:this.props.movie.genre_ids[0], vote_avg:this.props.movie.vote_average }))
    }
    render(){
        return <table key={this.props.movie.id}style={{
            borderCollapse:"separate",
            borderSpacing:50,
            backgroundColor:"white",
            color:"black",
            borderStyle:"groove",
            borderColor:"#04d9a4",
            borderRadius:75
        }}>
           <tbody>
             <tr>
               <td>
                 <img style={{borderRadius:75}} alt="poster" src={this.props.movie.poster_src}/>
               </td>
               <td align="left">
                 <h3>{this.props.movie.title}</h3>
                 <p>{this.props.movie.overview}</p>
                 <input type="button" onClick={this.viewMovie.bind(this)} class="btn btn-success" value="View"/>
                 <br/><br/>
                 <input type="button" onClick={this.sendFav.bind(this)} class="btn btn-danger" value="Fav"/>
               </td>
             </tr>
           </tbody>
         </table>
    }
}

export default MovieRow;