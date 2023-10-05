
import { Stomp } from '@stomp/stompjs';
import $ from 'jquery';
import SockJS from 'sockjs-client';

var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    var socket = new SockJS('/app');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        // stompClient.subscribe('/topic/greetings', function (greeting) {
        //     showGreeting(JSON.parse(greeting.body).content);
        // });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    connect();
const user = localStorage.getItem('user')
const userFirstName=JSON.parse(user).firstName
const message = $("#name").val();
const jsonStringy = JSON.stringify({'name':userFirstName,'message':message});
    stompClient.send("http://localhost:8080/app/hello",{}, jsonStringy);

}



$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
});
