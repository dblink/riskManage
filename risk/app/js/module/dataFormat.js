/**
 * Created by Administrator on 2017/3/29.
 */

const MoneyFormat = (data)=>{
  if (!data){
    return data;
  }
  let array = [];
  let small;
  let number;
  small = data.toString().split(".")[1];
  data = data.toString().split(".")[0];
  data = data.toString().split("");
  data.map((line, key) =>{
    let num = data.length - key;
    if (num % 3 === 0 && num !== data.length){
      array.push(",");
    }
    array.push(line);
  });
  if (small){
    number = array.join("") + "." + small;
  }else{
    number = array.join("");
  }
  return number;
};

export const moneyFormat = (data)=>{
  return MoneyFormat(data);
};