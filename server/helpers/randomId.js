export const randomId = () => {
  try {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";  
  
    var stringLength = 8;  
    var randomString = '';  
  
    for (var i = 0; i < stringLength; i++) {  
      var randomNumber = Math.floor(Math.random() * chars.length);  
      randomString += chars.substring(randomNumber, randomNumber + 1);  
    }  
    return randomString;

  } catch (error) {
    console.log(error);
  }
};
