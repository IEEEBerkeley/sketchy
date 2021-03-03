// Time the timer should run
let totalTime = 10

let time = totalTime;

// Function to loop without thread blocking
function whileLoop() {
    let condition = true;

    function loop() {
        if (condition) {
            time = totalTime;
            let timer = setInterval(function() {
                document.getElementById("timer").innerHTML = time + " seconds";
                time = time - 1;
            
                if (time < 0) {
                    clearInterval(timer);
                }
            }, 1000);

            setTimeout(loop, totalTime * 1000 + 1000);
        }
    }

    loop();
}

whileLoop();