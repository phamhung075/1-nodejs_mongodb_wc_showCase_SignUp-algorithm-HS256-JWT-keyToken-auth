![[Pasted image 20231126111324.png]]
MongoDB là một hệ quản trị cơ sở dữ liệu NoSQL mã nguồn mở đa nền tảng viết bằng C++
Sử dụng compass mongodb 
https://www.mongodb.com/try/download/shell

run server
``` 
node --trace-warnings --watch .\server.js
node  --watch .\server.js
```




./app.js
``` js
// init db
require('./dbs/init.mongodb.js');
const {countConnect} = require('./helpers/check.connect.js');
countConnect();
const {checkOverload} = require('./helpers/check.connect.js');
checkOverload();
```
## Nhược điểm của cách Connect cũ

``` js
'use strict'

const mongoose  = require('mongoose');

// const PORT = 27017;

const connectString = `mongodb://localhost:27017/shopDEV`;

mongoose.connect( connectString).then( _ => console.log(`Connected Mongodb Success at port 27017`))
.catch(err => console.log(`MongoDB Connect Error:`, err));

// dev
if (1===0){
    mongoose.set('debug',true);
    mongoose.set('debug', {color: true});
}

module.exports = mongoose;
```

## Các connect mới khuyên dùng

Phương pháp Singleton là một mô hình thiết kế phổ biến trong lập trình, được sử dụng để đảm bảo rằng một lớp chỉ có một thực thể duy nhất và cung cấp một điểm truy cập toàn cục đến thực thể đó. Trong bối cảnh của cơ sở dữ liệu như MongoDB, việc áp dụng mô hình Singleton cho việc quản lý kết nối có thể mang lại một số lợi ích:

### Cách Hoạt Động của Singleton trong Quản Lý Kết Nối

- **Khởi Tạo Độc Nhất**: Khi phương thức `getInstance()` được gọi lần đầu tiên, nó sẽ tạo một thực thể mới của lớp. Các lần gọi tiếp theo đến phương thức này sẽ trả về thực thể đã tồn tại mà không tạo thêm thực thể mới.
- **Duy Nhất và Tái Sử Dụng**: Điều này đảm bảo rằng chỉ có một kết nối hoặc một pool kết nối tới cơ sở dữ liệu được duy trì trong suốt vòng đời của ứng dụng, giúp tối ưu tài nguyên và quản lý kết nối hiệu quả.

### Lợi Ích

- **Tối Ưu Hóa Tài Nguyên**: Ngăn chặn việc tạo ra nhiều kết nối không cần thiết, giảm áp lực lên tài nguyên hệ thống.
- **Quản Lý Kết Nối Hiệu Quả**: Dễ dàng quản lý kết nối với cơ sở dữ liệu, giảm khả năng xảy ra lỗi do quản lý kết nối không đồng nhất.

### Sử Dụng Trong Ứng Dụng

- **Phù Hợp cho Ứng Dụng Đơn Luồng**: Mô hình Singleton rất phù hợp với các ứng dụng đơn luồng hoặc có yêu cầu quản lý tài nguyên nghiêm ngặt.
- **Ứng Dụng Theo Dõi và Quản Lý**: Giống như Task Monitor (Mac) hay Task Manager (Windows), Singleton có thể được sử dụng để quản lý các kết nối hoặc tài nguyên quan trọng khác trong ứng dụng.

### Điều Cần Lưu Ý

- **Đa Luồng và Đa Tiến Trình**: Trong môi trường đa luồng hoặc đa tiến trình, việc triển khai mô hình Singleton cần được xử lý cẩn thận để tránh các vấn đề liên quan đến đồng thời và tài nguyên chia sẻ.

Mô hình Singleton giúp quản lý kết nối cơ sở dữ liệu một cách hiệu quả, đảm bảo sự ổn định và tối ưu hóa tài nguyên. Tuy nhiên, cần xem xét kỹ lưỡng các yêu cầu cụ thể của ứng dụng và môi trường triển khai để đảm bảo mô hình này phát huy hiệu quả tối ưu.


./dbs/init.mongodb.js (xem phía dưới bản hoàn chỉnh)
``` js
'use strict'

const mongoose  = require('mongoose');

// const PORT = 27017;

const connectString = `mongodb://localhost:27017/shopDEV`;



class Database {
    constructor() {
        this.connect();
    }
    
    //connect
    connect(type = 'mongodb'){
        if (1===1){
            mongoose.set('debug',true);
            mongoose.set('debug', {color: true});
        }

        mongoose.connect( connectString).then( _ => console.log(`Connected Mongodb Success at port 27017`))
        .catch(err => console.log(`MongoDB Connect Error:`, err));
    }
    // dev
    static getInstance() {
        if(!Database.instance){
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
```

## Kiểm tra hệ thống có bao nhiêu connect
./helper/check.connect.js
``` js
'use strict'

const mongoose = require('mongoose');

const countConnect = () => {

    const numConnection = mongoose.connections.length;

    console.log(`Number of connection :: ${numConnection}`);

}

  

module.exports = {

    countConnect

}
```

### Thông Báo Server Quá Tải Connect

- **Tác Động của Nhiều Kết Nối**: Tạo ra quá nhiều kết nối có thể gây áp lực lớn lên tài nguyên hệ thống như CPU và bộ nhớ. Điều này không chỉ làm giảm hiệu suất truy vấn mà còn có thể dẫn đến việc cơ sở dữ liệu bị crash.
- **Đánh Giá Tải Hệ Thống**: Quản lý số lượng kết nối dựa trên khả năng xử lý của CPU và tài nguyên sẵn có là cách tiếp cận thông minh. Điều này đòi hỏi việc theo dõi và điều chỉnh liên tục dựa trên tải hệ thống.

### Có Nên Disconnect Liên Tục Hay Không

- **Quản Lý Kết Nối Tự Động**: MongoDB sử dụng connection pool để tự động quản lý việc mở và đóng kết nối. Điều này giúp giảm bớt công việc và tăng hiệu suất bằng cách tái sử dụng các kết nối sẵn có.
- **Trường Hợp Đóng Kết Nối Rõ Ràng**: Trong một số trường hợp cụ thể, như khi ứng dụng sắp kết thúc hoặc cần giải phóng tài nguyên ngay lập tức, bạn có thể muốn đóng các kết nối cơ sở dữ liệu một cách rõ ràng. Điều này giúp đảm bảo rằng không có giao dịch hoặc dữ liệu nào bị mất trong quá trình này.

### Khi Cần Đóng Kết Nối Một Cách Rõ Ràng

- **Khi Tắt Ứng Dụng**: Khi ứng dụng của bạn không cần sử dụng cơ sở dữ liệu nữa, nên đóng tất cả các kết nối đang hoạt động. Điều này giúp giải phóng tài nguyên và đảm bảo rằng không có giao dịch nào bị gián đoạn.
- **Sử Dụng API Đóng Kết Nối**: Hầu hết các trình điều khiển cơ sở dữ liệu cung cấp API cho phép bạn đóng kết nối một cách rõ ràng. Sử dụng các API này để kiểm soát quá trình đóng kết nối.

Quản lý kết nối là một phần quan trọng của việc duy trì hiệu suất và ổn định của hệ thống cơ sở dữ liệu. Việc sử dụng các phương thức tự động và rõ ràng để quản lý kết nối giúp tối ưu hóa tài nguyên và đảm bảo tính toàn vẹn dữ liệu.
``` js
process.on('SIGINT', () => {

    server.close(() => console.log(`Exit ${NAME_SERVER}`))

    // notify.send( ping...)

});
```


### 1. **Connection Pool trong MongoDB**

- **Connection Pool (Nhóm Kết Nối)**: Là một tập hợp các kết nối đến cơ sở dữ liệu được duy trì sẵn để tái sử dụng. Điều này giúp cải thiện hiệu suất bằng cách giảm bớt thời gian và tài nguyên cần thiết để mở và đóng các kết nối liên tục.
- **Tái Sử Dụng Kết Nối**: Khi một yêu cầu mới tới, hệ thống sẽ kiểm tra xem có kết nối nào sẵn có trong pool không. Nếu có, kết nối đó sẽ được tái sử dụng thay vì phải mở một kết nối mới.

### 2. **maxPoolSize**

- **maxPoolSize**: Là số lượng kết nối tối đa có thể có trong pool. Nó giới hạn số lượng kết nối đồng thời tới cơ sở dữ liệu, giúp quản lý tài nguyên hiệu quả.
- **Khi Có Yêu Cầu Kết Nối Mới**: Nếu pool chưa đầy (số lượng kết nối hiện tại nhỏ hơn maxPoolSize) và không có kết nối sẵn có, MongoDB sẽ tạo một kết nối mới và thêm vào pool.

### 3. **Lợi Ích của PoolSize**

- **Hiệu Suất**: Giảm độ trễ trong việc thiết lập kết nối mới, tăng hiệu suất xử lý yêu cầu.
- **Tối Ưu Tài Nguyên**: Quản lý tốt hơn các tài nguyên hệ thống như bộ nhớ và CPU.
- **Khả Năng Mở Rộng**: Giúp hệ thống ứng phó tốt hơn với sự tăng đột ngột trong số lượng yêu cầu.

### 4. **Quá Tải maxPoolSize**

- **Khi Vượt Quá Giới Hạn**: Nếu số lượng yêu cầu kết nối vượt quá maxPoolSize, MongoDB không tạo thêm kết nối mới. Thay vào đó, các yêu cầu sẽ được đặt trong hàng đợi và xử lý tuần tự khi có kết nối trở nên sẵn có.
- **Quản Lý Tài Nguyên**: Số lượng kết nối đồng thời phụ thuộc vào tài nguyên hệ thống (như bộ nhớ và CPU). Điều chỉnh maxPoolSize dựa trên tài nguyên có thể giúp tối ưu hiệu suất.

### 5. **Tối Ưu PoolSize**

- **Cân Nhắc Khi Tùy Chỉnh**: Tăng hoặc giảm kích thước của poolSize nên được thực hiện dựa trên yêu cầu cụ thể của ứng dụng và tài nguyên hệ thống có sẵn.
- **Phản Ứng Linh Hoạt**: Hệ thống nên được cấu hình để linh hoạt điều chỉnh kích thước pool dựa trên tải hệ thống và yêu cầu thực tế.

Như vậy, PoolSize trong MongoDB giúp quản lý kết nối một cách hiệu quả, cải thiện hiệu suất và khả năng mở rộng của ứng dụng, đồng thời tối ưu hóa việc sử dụng tài nguyên hệ thống

``` js
    connect(type = 'mongodb'){
        if (1===0){
            mongoose.set('debug',true);
            mongoose.set('debug', {color: true});
        }

        mongoose.connect( connectString, {
            maxPoolSize: 50 //PoolSize
        }).then( _ => console.log(`Connected Mongodb Success at port 27017`))
        .catch(err => console.log(`MongoDB Connect Error:`, err));
    }
```




--------------
./dbs/init.mongodb.js
``` js
'use strict'

const mongoose  = require('mongoose');
const {db: {host, name, port}} = require ('../configs/config.mongodb');

const connectString = `mongodb://${host}:${port}/${name}`;

console.log(`connectString:`, connectString);

class Database {
    constructor() {
        this.connect();
    }
    
    //connect
    connect(type = 'mongodb'){
        if (1===1){
            mongoose.set('debug',true);
            mongoose.set('debug', {color: true});
        }

        mongoose.connect( connectString, {
            maxPoolSize: 50
        }).then( _ => console.log(`Connected Mongodb Success at port 27017`))
        .catch(err => console.log(`MongoDB Connect Error:`, err));
    }
    // dev
    static getInstance() {
        if(!Database.instance){
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
```


./configs/[config.mongodb.js](obsidian://open?vault=MyBrain&file=Programmation%2FNodejs%2FCode%2Fnodejs_wc_init%2Fdocs%2Fconfig)
``` js
'use strict'

//level 02
const dev = {
    app: {
        port: process.env.DEV_APP_PORT || 3052
    },
    db: {
        host: process.env.DEV_DB_HOST || 'localhost',
        port: process.env.DEV_DB_PORT || 27017,
        name: process.env.DEV_DB_NAME || 'shopDEV'
    }
};


const pro = {
    app: {
        port: process.env.PRO_APP_PORT || 3000
    },
    db: {
        host: process.env.PRO_DB_HOST || 'localhost',
        port: process.env.PRO_DB_PORT || 27017,
        name: process.env.PRO_DB_NAME || 'shopPRO'
    }
};

const config = { dev, pro };
const env = process.env.NODE_ENV || 'dev';
module.exports = config[env];
```

./.env
``` js
DEV_APP_PORT=3052
DEV_DB_HOST=localhost
DEV_DB_PORT=27017
DEV_DB_NAME=shopDEV

PRO_APP_PORT=3000
PRO_DB_HOST=localhost
PRO_DB_PORT=27017
PRO_DB_NAME=shopPRO

PORT=3052
#NODE_ENV=pro
```
