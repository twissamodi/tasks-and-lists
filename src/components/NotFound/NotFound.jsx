const NotFound=(err=[])=>{
    return(
        <div>Not Found {err.response?.data} </div>
    )
}
export default NotFound;