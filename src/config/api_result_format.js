class Base{
    constructor({errnum,data,messages}){
        this.errnum=errnum
        if(data){
            this.data=data
        }
        if(messages){
            this.messages=messages
        }
    }
}


/**
 * api求情成功时候的数据结构.
 * 成功时的errnum为0，返回数据
 */

 class Success extends Base{
     constructor(data={}){
        super({
            errnum:0,
            data:data
        })
     }
 }


class Error extends Base{
    //api错误时的错误code是不一样的，错误message也不一样
    constructor({errnum,messages}){
        super({errnum,messages})
    }
}

module.exports={
    Success,
    Error
}
