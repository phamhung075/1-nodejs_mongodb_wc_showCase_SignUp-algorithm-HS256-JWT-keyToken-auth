![[Pasted image 20231127213453.png]]



``` 
node  --watch .\server.js
```

./auth/constant.js
``` js
const RolesShop = {
    SHOP: 'SHOP',
    WRITTER : 'WRITER', //Binh thuong chi ghi bang so hoặc mã, để khi show ra browser người ta k biết ý nghĩa 
    EDITOR : 'EDITOR',
    ADMIN : 'ADMIN',
}
```


./app.js

``` js
app.use(express.json()); //js version 4 đã hỗ trọ json nên k cần cải body parse nữa
app.use(express.urlencoded({ // mở rộng url 
    extends: true
}))
```


kiến thức về mô hình bất đối xứng trong security hệ thống
Trong thực tế, các chức năng này dành cho hệ thống rất lớn như amazon hoặc cloud google
Vd: Khi sử dụng file base của google cloud hay AWS, cho phép chúng ta down về một file key để trong máy chúng ta, chúng ta sử dụng để import vào -> khởi tạo unique một file base của cloud googlethì chúng ta mới sử dụng pem này
![[Pasted image 20231128112259.png]]
ecommerce nên làm đơn giản 

Trong thời gian hiện đại gần đây người ta sẽ tạo 1 USB, usb mục đích tích hợp phần cứng vào private key
![[Pasted image 20231128112433.png]]
Khi dùng usb găm vào máy thì sẽ mở được password của hệ thống,
Người ăn trộm usb đó mới có thể đột nhập vào tài khoản của họ
Để đơn giản chúng ta k cần phải sử dụng crypto generale này
![[Pasted image 20231128112609.png]]
bằng cách sử dụng các thuật toán khác
thuật toán cũ là các file lv2
