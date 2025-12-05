const BASE_URL = "https://dummyjson.com"

const app={

    inint () {
       this.getUsers();
    },
    async getUsers(){
        const response = await fetch(`${BASE_URL}/posts`);
        const data = await response.json();
        renderPosts(data.posts);
    },
    renderPosts(post){
        
    }
};
app.inint()