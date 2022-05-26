var getScriptPromisify = (src) => {
  return new Promise((resolve) => {
    $.getScript(src, resolve);
  });
};

(function () {
  const prepared = document.createElement("template");
  prepared.innerHTML = `
      <style>
      </style>
      <div id="root" style="width: 100%; height: 100%;">
      </div>
    `;
  class SampleRingGaugePrepped extends HTMLElement {
    constructor() {
      super();

      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(prepared.content.cloneNode(true));

      this._root = this._shadowRoot.getElementById("root");

      this._props = {};

      this.render();
    }

    onCustomWidgetResize(width, height) {
      this.render();
    }

    set myDataSource(dataBinding) {
      this._myDataSource = dataBinding;
      this.render();
    }

    async render() {
      await getScriptPromisify(
        "https://cdn.bootcdn.net/ajax/libs/echarts/5.0.0/echarts.min.js"
      );

      if (!this._myDataSource || this._myDataSource.state !== "success") {
        return;
      }

      const dimension = this._myDataSource.metadata.feeds.dimensions.values[0];
      const measure = this._myDataSource.metadata.feeds.measures.values[0];
      const data = this._myDataSource.data.map((data) => {
        return {
          name: data[dimension].label,
          value: data[measure].raw,
        };
      });

      const myChart = echarts.init(this._root, "wight");
      const option = {
        series: [
          {
            type: "gauge",
            anchor: {
              show: true,
              showAbove: true,
              size: 18,
              itemStyle: {
                color: "#080808",
              },
            },
            pointer: {
              icon: "path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z",
              width: 8,
              length: "80%",
              offsetCenter: [0, "8%"],
            },
            progress: {
              show: true,
              overlap: true,
              roundCap: true,
            },
            axisLine: {
              roundCap: true,
            },
            data,
            title: {
              fontSize: 14,
            },
            detail: {
              width: 40,
              height: 14,
              fontSize: 14,
              color: "#080808",
              backgroundColor: "auto",
              borderRadius: 3,
              formatter: "{value}%",
            },
          },
        ],
      };
      myChart.setOption(option);
    }
  }

  customElements.define("github-sap-demo-ring-gauge", SampleRingGaugePrepped);
})();
