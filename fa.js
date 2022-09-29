import React from 'react'

class Faour extends React.Component{
  viewMovie() {
    const url = "https://www.themoviedb.org/movie/" + this.props.id
    window.location.href = url
}

  delMov() {
    var xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://localhost:5000/del')
    xhr.send(JSON.stringify({id:this.props.id}))
  }

  render(){
      return  <div align="left">
        
        <table key={this.props.id}style={{
            borderCollapse:"separate",
            borderSpacing:20,
            backgroundColor:"#04d9a4",
            color:"black",
            borderStyle:"groove",
            borderColor:"#04d9a4",
            borderRadius:75
        }}>
           <tbody>
             <tr>
               <td>
            <h5>{this.props.tit}</h5>
            <input type="button" onClick={this.viewMovie.bind(this)} class="btn btn-info" value="View"/>
            <br/><br/>
            <input type="button" onClick={this.delMov.bind(this)} class="btn btn-danger" value="Delete"/>
            </td></tr>
            </tbody>
            </table>
        </div>
    }
}

export default Faour;