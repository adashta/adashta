class Adashta {
  adashtaSocketHost; // TODO: Change `adashtaSocketHost` data type.
  adashtaSocketPort; // TODO: Change `adashtaSocketPort` data type.

  constructor(config) {
    this.adashtaSocketHost = config.adashtaSocketHost || 'localhost';

    if (this.adashtaSocketHost && !isRelativeUrl(this.adashtaSocketHost)) {
      console.error('Adashta: Invalid socket host');
    }

    this.adashtaSocketPort = config.adashtaSocketPort || 8080;

    if (this.adashtaSocketPort < 0 || this.adashtaSocketPort > 65535) {
      console.error('Adashta: Invalid socket port');
    }

    let scriptEle = document.createElement("script");
    scriptEle.setAttribute("src", "https://cdn.jsdelivr.net/npm/chart.js");
    document.body.appendChild(scriptEle);

    const exampleSocket = new WebSocket(`ws://${this.adashtaSocketHost}:${this.adashtaSocketPort}`);
    
    scriptEle.onload = () => {
      setTimeout(() => {
        exampleSocket.send(JSON.stringify({
            message: `This is message is from client`
        }));
      }, 1000);
    
      const chartData = {};
      exampleSocket.addEventListener("message", (event) => {
        console.log("Message from server ", JSON.parse(event.data));
    
        const response = JSON.parse(event.data);
    
        if(Object.keys(chartData).includes(response.chartId)) {
    
          // Updating labels
          chartData[response.chartId].data.labels = response.data.data.labels;
          
          // Updating options
          chartData[response.chartId].options = response.data.options;
    
          // Datasets options
          for (let i=0; i<response.data.data.datasets.length; i++) {
            if(chartData[response.chartId].data.datasets[i]) {
              chartData[response.chartId].data.datasets[i].data = response.data.data.datasets[i].data;
            }
            else {
              chartData[response.chartId].data.datasets[i] = response.data.data.datasets[i];
            }
          }
    
          // chartData[response.chartId].data.labels.push('world');
          // chartData[response.chartId].data.datasets[0].data.push(Math.floor(Math.random() * 10));
          
          chartData[response.chartId].update();
        }
        else {
          chartData[response.chartId] = new Chart(document.querySelectorAll(response.querySelector)[0], response.data);
        }
      });
    };
  }
}

const isRelativeUrl = (urlString) => {
  const RgExp = new RegExp('^(?:[a-z]+:)?//', 'i');
  if (RgExp.test(urlString)) {
    return false;
  } else {
    return true;
  }
};
