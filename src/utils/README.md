# AES-CRYPTO

通过AES实现对称加密

### 导出说明:

|       名称        | 类型  |                 说明                  |
| :---------------: | :---: | :-----------------------------------: |
| **AESEncryption** | Class |              AES 加密类               |
|    **AESTYPE**    | enum  | AES 加密类型提供128、192、256三个选择 |

### AESEncryption构造函数说明

|        名称        |          类型           |   说明   | 默认值 |
| :----------------: | :---------------------: | :------: | :----: |
|       **iv**       |         string          |  偏移量  |   ''   |
| **clearEncoding**  | Utf8AsciiBinaryEncoding |   编码   |  utf8  |
| **cipherEncoding** | HexBase64BinaryEncoding | 密码编码 |  hex   |
|   **encryType**    |         AESTYPE         |          | AES256 |

### 使用示例:

**1、引用**:

```javascript
import AESEncryption, { AESTYPE } from '../src/encryption';
const _encryption = new AESEncryption();
 
const key = 'FB32D61111CBE2D012E7A12209322CF5FB32D671D6CBE2D012E7A12209322CF5'
const data = { ic_num: '48948feafe879-eferfe-234233-afeafeafew' } 
```

**2、加密**

```javascript
const encryStr = _encryption.encryption(JSON.stringify(data), key)
console.log(encryStr);
```

**3、解密**

```javascript
const decodedStr = _encryption.decryption(encryStr, key)
console.log(decodedStr);
```