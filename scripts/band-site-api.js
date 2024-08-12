export default class BandSiteApi{
    constructor(){
        this.baseUrl = 'https://unit-2-project-api-25c1595833b2.herokuapp.com';
        (async () => {
            try {
                const response = await axios.get(`${this.baseUrl}/register`);
                this.apiKey = response.data.api_key;
            } catch (error){
                console.error(error);
            }
        })();
    }

    async getShows(){
        try{
            const response = await axios.get(`${this.baseUrl}/showdates?api_key=${this.apiKey}`);
            let result = [];
            response.data.forEach(element => {
                const newShow = {
                    venue: element.place, 
                    date: new Date(element.date).toDateString(),
                    location: element.location
                }
                result.push(newShow);
            });
            return result;
        } catch (error){
            console.error(error);
        }        
    }

    async getComments(){
        try{
            const response = await axios.get(`${this.baseUrl}/comments?api_key=${this.apiKey}`);
            let result = [];
            response.data.forEach(element =>{
                const newComment = {
                    name: element.name,
                    date: new Date(element.timestamp),
                    Comment: element.comment
                }
                result.push(newComment);
            });
            return result;
        } catch (error){
            console.error(error);
        }
    }

    async postComment(userName,userComment){
        try{
            const response = await axios.post(`${this.baseUrl}/comments?api_key=${this.apiKey}`,
                {
                name: userName,
                comment:userComment
            });
        } catch (error){
            console.error(error);
            throw error;
        }
    }
}
