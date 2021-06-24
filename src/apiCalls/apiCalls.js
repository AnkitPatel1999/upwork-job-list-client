export const getJobList = () => {
    return fetch('http://localhost:8000/api/joblist', { method: 'GET'})
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
}