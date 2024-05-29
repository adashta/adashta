# Adashta

Adashta offers advanced SDKs for real-time communication, allowing developers to focus on their application's core business logic.

## Features

- **Adashta Charts**: Create real-time charts with minimal to no frontend coding required.


### Installation and Initialization

#### Server
1. Install the Adashta using npm or yarn:

```bash
npm install adashta
```

2. Initialize the Adashta with your host and port:

```javascript
const adashta = new Adashta({
  adashtaHost: 'localhost',
  adashtaPort: 3011
});
```

3. Full Boilerplate
  
```javascript
const { Adashta } = require('adashta');

const adashta = new Adashta({
  adashtaHost: 'localhost',
  adashtaPort: '3011'
});

const a = async () => {
  
  adashta.on('connection', async (clientId) => {

    const chart1 = {
      chartId: '123',
      querySelector: '.chart',
      chartData: {
        type: 'line',
        data: {
          labels: ['hello'],
          datasets: [{
            label: '# of Votes',
            data: [1],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      }
    };

    await adashta.charts().produce(clientId, chart1);

    setTimeout(() => {
      chart1.chartData.data.datasets[1] = {
        label: '# of Votes',
        data: [1],
        borderWidth: 1
      }

      setInterval(async () => {
        chart1.chartData.data.labels.push('world');
        chart1.chartData.data.datasets[0].data.push(Math.floor(Math.random() * 10));
        chart1.chartData.data.datasets[1].data.push(Math.floor(Math.random() * 10));
        await adashta.charts().produce(clientId, chart1);
      }, 2000);
    }, 1000)
  });

  adashta.on('disconnection', async (clientId) => {
    console.log('Client disconnected', clientId);
  });
};

a();
```

#### Client

1. Include the Adashta SDK in your HTML file:

```html
<script type="module">
    import { Adashta } from 'https://cdn.skypack.dev/adashta-js@v1.0.7';
</script>
```

2. Initialize the Adashta with your host and port:

```javascript
const adashta = new Adashta({
  adashtaHost: 'localhost',
  adashtaPort: 3011
});
```

3. Full Boilerplate

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

Adashta Charts is a real-time data visualization tool that allows you to create charts with minimal to no frontend coding required.

#### Server

1. Create a new chart:

```javascript
const chart1 = {
  chartId: '123',
  querySelector: '.chart',
  chartData: {
    type: 'line',
    data: {
      labels: ['hello'],
      datasets: [{
        label: '# of Votes',
        data: [1],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
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

3. Update the chart data:

```javascript
chart1.chartData.data.labels.push('world');
chart1.chartData.data.datasets[0].data.push(Math.floor(Math.random() * 10));
chart1.chartData.data.datasets[1].data.push(Math.floor(Math.random() * 10));
await adashta.charts().produce(clientId, chart1);
```

#### Client

No additional frontend coding is required to render the chart. The chart will be automatically rendered in the specified query selector.



