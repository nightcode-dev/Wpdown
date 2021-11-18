var https = require("https");
var http = require("http");
var fs = require("fs");
var url = require("url");
var chalk = require("chalk");
console.log(chalk.green(`██╗    ██╗██████╗ ██████╗  ██████╗ ██╗    ██╗███╗   ██╗
██║    ██║██╔══██╗██╔══██╗██╔═══██╗██║    ██║████╗  ██║
██║ █╗ ██║██████╔╝██║  ██║██║   ██║██║ █╗ ██║██╔██╗ ██║
██║███╗██║██╔═══╝ ██║  ██║██║   ██║██║███╗██║██║╚██╗██║
╚███╔███╔╝██║     ██████╔╝╚██████╔╝╚███╔███╔╝██║ ╚████║
 ╚══╝╚══╝ ╚═╝     ╚═════╝  ╚═════╝  ╚══╝╚══╝ ╚═╝  ╚═══╝
                                                       `));
console.log(chalk.green('welcome to WPdown script we downliad your link and write it on a file for you to use it dont forget to enter link with http:// or https:// it need to find and read your link'));
process.stdout.write(chalk.red('>>'));
process.stdout.write(chalk.green("enter the link:"));
process.stdin.on("data",function(data){
	  var link = new URL(data.toString());
	  var options = {
	     hostname:link.hostname,
	     port:0,
	     path:link.pathname,
	     method:"GET"
	  }
	  if(link.protocol == "https:"){
	      options.port = 443;
	      var part = 2;
	var data = "";
	var req = https.request(options,function(res){
	    console.log("reading...");
	    console.log(`status:${res.statusCode}`);
	    console.log("headers:%j",res.headers);
	    res.once("data",function(chunk){
	       console.log("first chunk downloaded");
	    });
	    res.on("data",function(chunk){
	       console.log(`part${part} downloaded`);
	       data += chunk;
	       part++
	    });
	    res.on("end",function(){
	       console.log("download complated... \n enter the name you like to be a file name");
	       fs.writeFile(`${link.hostname}.html`,data,function(err){
	          if(err){
	             throw err;
	          }else{
	             console.log("file created now you can used");
	          }
	       });
	       
	    });
	});
	req.on("error",function(err){
	  console.log("download be errored...");
	  console.log(`error:${err.message}`);
	});
	req.end();
	  }else if(link.protocol == "http:"){
	      options.port = 80;
	      var part = 2;
	var data = "";
	var req = http.request(options,function(res){
	    console.log("reading...");
	    console.log(`status:${res.statusCode}`);
	    console.log("headers:%j",res.headers);
	    res.once("data",function(chunk){
	       console.log("first chunk downloaded");
	    });
	    res.on("data",function(chunk){
	       console.log(`part${part} downloaded`);
	       data += chunk;
	       part++
	    });
	    res.on("end",function(){
	       console.log("download complated... \n enter the name you like to be a file name");
	       fs.writeFile(`${link.hostname}.html`,data,function(err){
	          if(err){
	             throw err;
	          }else{
	             console.log("file created now you can used");
	          }
	       });
	       
	    });
	});
	req.on("error",function(err){
	  console.log("download be errored...");
	  console.log(`error:${err.message}`);
	});
	req.end();
	  }else{
	      console.log("the link not supported");
	  }
});