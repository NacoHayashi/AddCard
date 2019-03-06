/**
 * This is a JavaScript practice - add card
 * 
 * @author Naco Lin
 * @version 0.1.0
 * 
 */

;'use strict';

/* board */
var Board = function (options) {
    var area,
        data,
        getCardDetial;
    
    var init = function () {
        data = options.data;
        getCardDetial = options.getCardDetial;
        cacheDOM();
        this.newACard();    
    }

    var getCard = function (text) {
       getCardDetial(text); 
    }

    var cacheDOM = function () {
        area = document.getElementById('board');
    }

    this.newACard = function (options) {  
        var item = options;
        if (item){
            var newCard = new Card({item:item, getCard:getCard});
            area.appendChild(newCard.card());       
        } else {
            data.forEach(function (item) {
                var newCard = new Card({item:item, getCard:getCard});
                area.appendChild(newCard.card());
            });
        } 
    }

    init.call(this,options);
}

/* card */
var Card = function (options) {
        var element,
            area,
            cardTitle,
            cardDate,
            alertBtn,
            detialBtn,
            deleteBtn,
            edit,
            getCard,
            itemNum;

        init = function (options) {
            cardTitle = options.item.title;
            cardDate = options.item.date;
            getCard = options.getCard;
            itemNum = options.item.num;
            render();
            cacheDOM();
            cardEvent();
        }
        
        // card element
        var render = function () {
            element = 
                '<h3 class="title">' + cardTitle + '</h3>' +
                '<p class="date">' + cardDate + '</p>' +
                '<button class="alert">Alert</button>' +
                '<button class="detial">detial</button>' +
                '<button class="delete">delete</button>' + 
                '<button class="edit">edit</button>' ;
            area = document.createElement('div');
            area.classList.add('card');
            area.innerHTML = element;
        }

        // cacheDOM
        var cacheDOM = function () {
            alertBtn = area.querySelector('.alert');
            detialBtn = area.querySelector('.detial');
            deleteBtn =  area.querySelector('.delete');
            edit = area.querySelector('.edit');
        }

        // cardEvent
        var cardEvent = function () {
            alertBtn.addEventListener('click', alertTitle);
            detialBtn.addEventListener('click', returnDetial);
            deleteBtn.addEventListener('click', deleteCard);
            edit.addEventListener('click', intoEdit);
        }

        // alert title
        var alertTitle = function () {
            alert(cardTitle);
        }

        // return detail to App
        var returnDetial = function () {
            var today = new Date();
            var todayText = today.toString().substr(3,22);
            var text = document.createTextNode(cardTitle + '\n/\n' + cardDate + '\n/\n' + todayText);   
            getCard({content:text,type:"print"});
        }

        // delete this card
        var deleteCard = function () {
            area.style.display = "none";
            getCard({content:itemNum,type:"delete"});

        }

        // edit this card title and date
        var intoEdit = function () {
            area.innerHTML = 
            '<input type = "text" class = "editInput1" placeholder = "' + cardTitle + '"><br/>' +
            '<input type = "date" class = "editInput2" placeholder = "' + cardDate + '"><br/>' +
            '<button type = "submit" class = "getVal"> update </button>';
            area.querySelector('.getVal').addEventListener('click', getInputVal);    
        }

        // get the edit input value
        var getInputVal = function () {
            var titleVal = area.querySelector('input').value;
            var dateVal = area.querySelector('.editInput2').value;
            if (titleVal == "" && dateVal == ""){
                titleVal = area.querySelector('.editInput1').placeholder; 
                dateVal = area.querySelector('.editInput2').placeholder; 
            } else if(titleVal == ""){
                titleVal = area.querySelector('.editInput1').placeholder;
            } else if (dateVal == ""){
                dateVal = area.querySelector('.editInput2').placeholder;   
            }
            updateData(titleVal, dateVal);
            getCard({content:{title:titleVal,date:dateVal,num:itemNum},type:"edit"},);
            cardEvent();
        }

        //update data
        var updateData = function (titleVal, dateVal) {
            cardTitle = titleVal;
            cardDate = dateVal;
            area.innerHTML = 
            '<h3 class="title">' + cardTitle + '</h3>' +
            '<p class="date">' + cardDate + '</p>' +
            '<button class="alert">Alert</button>' +
            '<button class="detial">detial</button>' +
            '<button class="delete">delete</button>' + 
            '<button class="edit">edit</button>' ;
            cacheDOM();
           
            
        }

        // get card place
        this.card = function (options) {
            return area;
        }

        init.call(this, options);
}

/* detail table */
var Table = function (options) {   
    var area;

    var init = function () {
        cacheDOM();
    }

    var cacheDOM = function () {
        area = document.getElementById('detial');
    }
    
    this.createTr = function (options) {
        var newTr = document.createElement('div');
        newTr.append(options);
        area.append(newTr);
    }

    init.call(this.options);
}

/* add data (input value) */
var Add = function (options) {
        var area,
            sendBtn,
            titleInput,
            dateInput,
            titleVal,
            dateVal,
            putInputData;
        
        var init = function () {
            putInputData = options.putInputData;
            cacheDOM();
            btnEvent();
        }
        
        // cacheDom
        var cacheDOM = function () {
            area = document.getElementById('addCard');
            sendBtn = area.querySelector('.send');
            titleInput = area.querySelector('#titleInput');
            dateInput = area.querySelector('#dateInput');
        }

        // btn event
        var btnEvent = function () {
            sendBtn.addEventListener('click', getValue);
        }

        // get the input value
        var getValue = function (options) {
            titleVal = titleInput.value;
            dateVal = dateInput.value;
            
            if (titleVal != "" && dateVal != ""){
                returnInputData({title:titleVal, date:dateVal} );
                clear();
            } else {
                alert('input value is empty!!! ');
            }
        }

        // return data to app
        var returnInputData = function (options) {
            putInputData(options);
        }
        
        //clear input value
        var clear = function () {
            var Input = document.getElementsByTagName('input');
            for (var i = 0; i < 2; i++){
                Input[i].value = "";
            }
        }

        init.call(this);

}

/* main control function */
var App = function () {
    var NewBoard,
        NewTable,
        data;

    /* data manage */    
    var dataBox = function (options) {
        data = [
            { 
                title: 'Javascript',
                date: '2019-02-01',
                num: 1
            },
            {
                title: 'Html',
                date: '2019-02-02',
                num: 2
            }
        ]; 
        
    }   
    
    /* init */
    var init = function () {
            dataBox();
            //new input area
            new Add({putInputData:putInputData});
            
            //new board area
            NewBoard = new Board({data:data, getCardDetial:getCardDetial});

            //new table area
            NewTable = new Table();
    }
    
    var putInputData = function (options) {
        var n;
        for(var i = 1; i < data.length; i++){ 
            n = data[i].num + 1;
        } 
        options['num'] = n;
        data.push(options);
        NewBoard.newACard(options);
    }

    var getCardDetial = function (text) {
        var x = text.type,
            y = text.content;
        if (x == 'print'){
            NewTable.createTr(y); 
        } else if (x == 'delete'){
           data.forEach(function (item, index) {
               if(item.num == y){
                    data.splice(index,1);
               } 
           })
        } else{
            console.log(y);
            data.forEach(function (item, index) {
                if(item.num == y.num){
                     data.splice(index,1,y);
                } 
            })
        } 
    }

    

    init.call(this);
}    

var APP = new App;