export default (e)=>{
    e.preventDefault()
    console.log('log out pressed');
    localStorage.removeItem('uname')
    localStorage.removeItem('pass')
    document.cookie = "token=;"
    window.location.pathname='/'
}