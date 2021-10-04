const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express();
app.use(express.json())
app.use(cors());
const posts = {};

const handleEvent = (type, data) =>{
    if(type === 'PostCreated'){
        const { id , title} = data;
        post[id] = { id, title , comments:[]};
        console.log('post created')
    }
    if(type === 'CommentCreated'){
        const {id , content, postId } = data;
        const post = posts[postId];
        post.comments.push({id, content});
        console.log('comment created')
    }
}

app.get('/posts', (req, res)=>{
    res.send(posts)
})
app.post('/posts', (req, res)=>{
    const { type, data} = req.body;

    handleEvent(type, data);
    res.send({})
})

app.post('/events', (req, res) => {
    console.log('Recieved Event', req.body.type)
    res.send({})
    });
    

app.listen(4002, async ()=> {console.log("query listening on 4002")
const res = await axios.get('http://localhost:4005/events')
for(let event of res.data){
    console.log('processing event', event.data);
    handleEvent(event.type , event.data)
}
})