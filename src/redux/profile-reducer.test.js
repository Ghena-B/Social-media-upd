import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";

let state = {
    posts: [{id: 1, message: "Hi, how are youuu?", likesCount: '23'}, {
        id: 2,
        message: "I am using props",
        likesCount: '11'
    }],
}

it("length of posts should be incremented", () => {
    let action = addPostActionCreator("test-text")
    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(3)
});

it("new post text should be correct", () => {
    let action = addPostActionCreator("test-text")
    let newState = profileReducer(state, action)

    expect(newState.posts[2].message).toBe("test-text")
});

it("length of posts should be decremented", () => {
    let action = deletePost(1)
    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(1)
});

it("length of posts should not be decremented if postId is not valid", () => {
    let action = deletePost(100)
    let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(2)
});
