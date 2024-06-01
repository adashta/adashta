# Adashta

Adashta offers advanced SDKs for real-time communication, allowing developers to focus on their application's core business logic.

## Features

- **Adashta Charts**: Create real-time charts with minimal to no frontend coding required.


### Installation and Initialization

#### Server
1. Install the adashta using npm:

```bash
npm install adashta
```

2. Initialize the adashta with your `host` and `port`:

```javascript
const adashta = new Adashta({
  adashtaHost: 'localhost',
  adashtaPort: 3011
});
```

You need to pass the `host` and `port` of the adashta server to the constructor of the `Adashta` class. This will start the adashta server on the specified `host` and `port`.


3. Boilerplate
  
```javascript
const { Adashta } = require('adashta');

const adashta = new Adashta({
  adashtaHost: 'localhost',
  adashtaPort: '3011'
});

const loadAdashta = async () => {
  
  adashta.on('connection', async (clientId) => {
    console.log('Client connected', clientId);
  });

  adashta.on('disconnection', async (clientId) => {
    console.log('Client disconnected', clientId);
  });
};

loadAdashta();
```
In the above code, we are logging the `clientId` when a new client is connected and disconnected from the server.

`connection` event is triggered when a new client is connected to the server. `clientId` is passed as an argument to the callback function.

`disconnection` event is triggered when a client is disconnected from the server. `clientId` is passed as an argument to the callback function.


#### Client

1. Include the Adashta SDK in your HTML file:

```html
<script type="module">
    import { Adashta } from 'https://cdn.skypack.dev/adashta-js@v1.0.7';
</script>
```
Adashta is available as an ES module. You can include it in your HTML file using the script tag with type module.

2. Initialize the Adashta with your host and port:

```javascript
const adashta = new Adashta({
  adashtaHost: 'localhost',
  adashtaPort: 3011
});
```

You need to pass the host and port of the Adashta server to the constructor of the `Adashta` class. This will connect the client to the Adashta server running on the specified `host` and `port`.

3. Boilerplate

```html
<script type="module">
        import { Adashta } from 'https://cdn.skypack.dev/adashta-js@v1.0.7';
        
        const adashta = new Adashta({
          adashtaHost: 'localhost',
          adashtaPort: '3011'
        });
</script>
```

## SDKs

### Adashta Charts


Adashta charts is used to create real-time charts with minimal to no frontend coding required. You can create different types of charts like line, bar, pie, etc., and update them in real-time.

It is internally using the `Chart.js` library to render the charts. You can pass the chart data and configurations to the Adashta, and it will render the chart on the client side.


#### Server

1. Create a new chart:

```javascript
const chart1 = {
  chartId: 'dummy-company-stock-chart',
  querySelector: '.chart',
  chartData: {
    type: 'line',
    data: {
      labels: ['Day 1'],
      datasets: [{
        label: 'Dummy Company Stock Price',
        data: [350],
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        y: {
          title: {
            display: true,
            text: 'Share Price ($)'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Days'
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10,
          }
        }
      }
    }
  }
};
```

2. Produce the chart to the client:

```javascript
await adashta.charts().produce(clientId, chart1);
```

`produce` method takes two arguments, first is the `clientId` and second is the `chart` object.
`clientId` is the unique id of the client to whom we want to send the chart. It will be generated by the Adashta.
`chart` object is the object containing the chart data and other configurations, For more information refer to the [Chart.js documentation](https://www.chartjs.org/docs/latest).

3. Update the chart data:

```javascript
chart1.chartData.data.labels.push(`Day ${days}`);
chart1.chartData.data.datasets[0].data.push(getRandomInt(300, 800));
await adashta.charts().produce(clientId, chart1);
```

To update the chart use `produce` method again with the updated `chart` object. This will update the chart on the client side.

4. Boilerplate
```javascript
const { Adashta } = require('adashta');

const adashta = new Adashta({
  adashtaHost: 'localhost',
  adashtaPort: '3011'
});

const loadAdashta = async () => {
  
  adashta.on('connection', async (clientId) => {

    const chart = {
      chartId: 'dummy-company-stock-chart',
      querySelector: '.chart',
      chartData: {
        type: 'line',
        data: {
          labels: ['Day 1'],
          datasets: [{
            label: 'Dummy Company Stock Price',
            data: [350],
            borderWidth: 2
          }]
        },
        options: {
          scales: {
            y: {
              title: {
                display: true,
                text: 'Share Price ($)'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Days'
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 10,
              }
            }
          }
        }
      }
    };

    await adashta.charts().produce(clientId, chart);

    setTimeout(() => {

      let days = 2;
      setInterval(async () => {
        chart.chartData.data.labels.push(`Day ${days}`);
        chart.chartData.data.datasets[0].data.push(getRandomInt(300, 800));
        await adashta.charts().produce(clientId, chart);
        days++;
      }, 2000);
    }, 1000)
  });

  adashta.on('disconnection', async (clientId) => {
    console.log('Client disconnected', clientId);
  });
};

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

loadAdashta();
```
Here we are creating a chart with dummy data and sending it to the client.

Generally, We will have a `chart` object containing the chart data and other configurations. We will pass this object to the `produce` method to send the chart to the client.

We are using `setInterval` to update the chart data every 2 seconds. We are updating the labels and data of the chart object and then sending it to the client using produce method.

We are using a dummy function `getRandomInt` to generate random data for the chart. You can replace it with your own function to get the data from the database or any other source.

#### Client

No additional frontend coding is required to render the chart. The chart will be automatically rendered in the specified query selector.

This provides a seamless integration of real-time charts into your application without the need for complex frontend coding.


## Contributing

Adashta is an open-source project that aims to simplify real-time communication for developers. We welcome contributions and feedback from the community.
If you have any questions or suggestions, please feel free to reach out to us at contact@adashta.co

If you would like to contribute to the project, please visit our GitHub repository at github.com/adashta/adashta

Thank you for using Adashta!



