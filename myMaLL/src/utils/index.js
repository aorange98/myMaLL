
// 放置着当前案例需要的方法

export const formate = time=>{

    let date = new Date(new Date() - time);
    // console.log(date)
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
}