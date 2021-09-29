var users = [
    {
        id: 1,
        name: 'Khanh Bui'
    },
    {
        id: 2,
        name: 'Alex'
    },
    {
        id: 3,
        name: 'John'
    },
    {
        id: 4,
        name: 'Mie'
    },
    {
        id: 5,
        name: 'Trump'
    },

];

// key user_id để xác nhận cooment nào là của ai
var comments = [
    {
        id: 1,
        user_id: 1,
        content: 'Hello every body !'
    },
    {
        id: 2,
        user_id: 1,
        content: 'How are you to day ?'
    },
    {
        id: 3,
        user_id: 5,
        content: 'its Okay'
    },
    {
        id: 4,
        user_id: 4,
        content: 'Hello guys'
    },
    {
        id: 5,
        user_id: 3,
        content: 'Hello Mie. How are you ?'
    },
    {
        id: 6,
        user_id: 5,
        content: 'Nice to meet you all'
    },
    {
        id: 7,
        user_id: 1,
        content: 'Nice to meet you'
    },
    {
        id: 8,
        user_id: 1,
        content: 'Merry Christmas !'
    },
];

// Các bước thực hiện
// 1. Lấy comment 
// 2. Từ comment lấy ra user_id
// 3. Từ user_id lấy ra user

// Mô phỏng qua Fake API từ Backend trả về

function getComments () {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(comments);     
        }, 1000);
    });
}

// Function lấy ra users qua IDs
function getUsersByIds (userIds) {
    return new Promise(function(resolve) {
        var result = users.filter(function(user) {
            // return những user nằm trong list ID thui
            return userIds.includes(user.id);
        });

        // Fake chậm 1s
        setTimeout(function() {
            resolve(result);
        }, 1000);
    });
}

getComments()
    .then(function (comments) {
        // Tham số comments của getComment đã nhận cả data comments mà resolve truyển vào 
        // (Có thể console.log(comments) ra mà kiểm tra lấy được chưa)
        // nên để lấy ra tất cả list user_id của comments thì dùng map và .user_id

        // Lấy ra cả list user_id (Có thể console.log(userIDs) ra mà kiểm tra lấy được chưa)
        var userIDs = comments.map(function(comment) {
            return comment.user_id;
        });

        return getUsersByIds(userIDs)
            // Có thể truyền vào tham số là 1 array chứa vài id của user xem nó có trả đúng user ko (VD: [1,4,5])
            .then(function(users) {
                // Cho nó return ve 1 object chứa info user và nội dung comment của user đó
                return {
                    // Nên nhấn vào value của các Object bên dưới để biết được users vs comments là cái nào
                    users: users,
                    comments: comments,
                };
            });
    })
    .then(function(data) {
        // then bên trên return 1 promise và trong promise return lại info của users đã comment nên tham số data 
        // của then này sẽ nhận được users do promise của then trên return về

        // render ra giao diên users
        var commentBlock = document.querySelector('.content__comment .content__comment-place');

        var html = '';
        data.comments.forEach(function(comment) {
            var user = data.users.find(function(user) {
                return user.id === comment.user_id;
            });

            html += `<li><span>${user.name}:</span> </br> ${comment.content}</li>`;
        });

        commentBlock.innerHTML = html;
    });

