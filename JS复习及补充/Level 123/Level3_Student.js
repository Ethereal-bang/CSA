function Student(name) {
    function People(name) {
        this.tasks = [];
        this.tasks.push(() => {
            console.log(`Hi! This is ${name}!`);
            this.next();
        })
        setTimeout(() => this.next(), 0);// 先将后面任务加入队列再执行next
    }
    /**
     * @desc 弹出tasks队列的第一个任务并执行
     * */
    People.prototype.next = function () {
        this.tasks.shift()?.();
    }
    People.prototype.sleep = function (time) {
        this.tasks.push(() => {
            setTimeout(() => {
                console.log(`Wake up after ${time}`);
                // 执行完log再执行下一任务:
                this.next();
            }, time * 1000);
        })
        return this;    // 支持链式调用
    }
    People.prototype.sleepFirst = function (time) {
        this.tasks.unshift(() => {  // 放到第一个任务执行
            setTimeout(() => {
                console.log(`Wake up after ${time}`);
                this.next();
            },1000 * time);
        })
        return this;
    }
    People.prototype.study = function (course) {
        this.tasks.push(() => {
            console.log(`Study ${course}~`)
            this.next();
        })
        return this;
    }
    return new People(name);
}

Student('fxy');
// Hi! This is fxy!

Student('fxy').sleep(3).study('javascript');
// Hi -> Wake,Study

Student('fxy').study('javascript').study('Vue');
// Hi,Study,Study

Student('fxy').sleepFirst(5).study('Ajax');
// Wake -> Hi,Study