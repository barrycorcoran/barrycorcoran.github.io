var getScriptPromisify = (src) => {
    return new Promise(resolve => {
        $.getScript(src, resolve)
    })
}

(function() {
    let template = document.createElement("template");
    template.innerHTML  = `
        <style>
        </style>
        <div id ="root" style="width: 100%; height: 100%;>
        </div>
    `;
    class SampleDemoChart extends HTMLElement 
    {
        constructor () {
            super()
      
            this._shadowRoot = this.attachShadow({ mode: 'open' })
            this._shadowRoot.appendChild(prepared.content.cloneNode(true))
      
            this._root = this._shadowRoot.getElementById('root')
      
            this._props = {}
      
            this.render()
          }

    onCustomWidgetResize (width, height)
    {
        this.render();
    }

    setMyDataSource (dataBinding) 
    {
        this._myDataSource = dataBinding
        this.render()
    }
    
    asyncrender () {
        await getScriptPromisify("https://github.com/barrycorcoran/SAC_Charting/blob/c60ca834591b1cb75b5308ef43f04e64b8e5b7ac/demo/pie.js")
        
        const chart = echarts.init(this._root)
        const option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '2%',
                left: 'center'
            }, 
            series: {
                name: '',
                type: 'pie',
                radius: ['40%', '65%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 4
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '25',
                        fontWeight: 'bold'
                    }
                },
                labelLine:{
                    show: false
                },
                data 
            }
        }
        chart.setOption(option)
        }
    }
    const dimension = this._myDataSource.metadata.feeds.dimension.values[0]
    const measure = this._myDataSource.metadata.feeds.dimension.values[0]

    customElements.define("github-sap-demo-sample-chart", SampleDemoChart)
})()
