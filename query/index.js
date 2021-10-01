const express = require('express')
const cors = require('cors')
const app = express();
app.use(express.json())
app.use(cors());
const posts = {};

app.get('/posts', (req, res)=>{
    res.send(posts)
})
app.post('/posts', (req, res)=>{
    const { type, data} = req.body;
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
    res.send({})
})

app.post('/events', (req, res) => {
    console.log('Recieved Event', req.body.type)
    res.send({})
    });
    

app.listen(4002, ()=> console.log("query listening on 4002"))