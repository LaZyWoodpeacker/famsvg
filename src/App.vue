<template>
  <header>
    <a href="#" class="logo">FamS</a>
    <button @click="openOkDlg">Сформировать</button>
  </header>
  <div id="img-form"></div>
  <main class="main">
    <table class="striped">
      <tbody>
        <tr v-for="(item, idx) in list" :key="idx" @click="onFamClick">
          <td v-text="item"></td>
          <td v-text="parsedList[idx]"></td>
        </tr>
      </tbody>
    </table>
  </main>
  <footer>
    <p>&copy;knox.ru</p>
  </footer>

  <ok-dialog ref="ok"></ok-dialog>
  <form-dialog ref="form"></form-dialog>
</template>

<script>
import okDialog from "./components/OkDialog";
import formDialog from "./components/FormDialog";
import makeSvg from "./makesvg";

const loader = document.getElementById("wraper");
const pars = (raw) => {
  const em = raw.split(/[\s\.,]+/);
  let formated = "";
  if (em.length > 2) {
    formated = `${em[0]} ${em[1][0]}.${em[2][0]}.`;
  } else if (em.length === 2) {
    formated = `${em[0]} ${em[1][0]}.`;
  } else if (em.length === 1) {
  } else {
  }
  return formated.toUpperCase();
};
loader.text = function (text) {
  this.firstElementChild.innerText = text;
  return this;
};
loader.show = function () {
  this.style.display = "flex";
};
loader.hide = function () {
  this.style.display = "none";
};

const saveSvg = (svgEl, name) => {
  svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  let svgData = svgEl.outerHTML;
  let preface = '<?xml version="1.0" standalone="no"?>\r\n';
  let svgBlob = new Blob([preface, svgData], {
    type: "image/svg+xml;charset=utf-8",
  });
  let svgUrl = URL.createObjectURL(svgBlob);
  let downloadLink = document.createElement("a");
  downloadLink.href = svgUrl;
  downloadLink.download = name;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

const getData = async (url) => {
  const req = await fetch(url);
  if (req.status !== 200) {
    throw new Error("No data resived");
  }
  return await req.json();
};

const fitText = (text, box) => {
  const textBox = text.getBBox();
  const boxBox = box.getBBox();
  const wCof = (boxBox.width - 2) / textBox.width;
  const hCof = boxBox.height / textBox.height;
  txt.style.transform = `scale(${wCof},${hCof})`;
};

export default {
  name: "App",
  components: {
    "ok-dialog": okDialog,
    "form-dialog": formDialog,
  },
  data() {
    return {
      list: [],
    };
  },
  computed: {
    parsedList() {
      return this.list.map((e) => pars(e));
    },
  },
  mounted() {
    loader.show();
    getData("/data.json")
      .then((list) => {
        this.list = list;
        const div = document.getElementById("img-form");
        [makeSvg(this.parsedList.slice(0, 5))].forEach((page) => {
          window.svg = page.svg;
          window.txt = page.txt;
          window.ib = page.inBorder;
          const w = div.appendChild(page.svg);
        });
        fitText(txt, ib);
        loader.hide();
      })
      .catch();
  },
  methods: {
    onFamClick(ev) {
      const text = ev.currentTarget.children[1].innerText;
      txt.innerHTML = text;
      fitText(txt, ib);
    },
    openOkDlg() {
      const dlg = this.$refs.ok;
      dlg.header = "Сформировать SVG";
      dlg.show = true;
      dlg.message = "";
      dlg.action = () => {
        saveSvg(svg, "page.svg");
        dlg.show = false;
      };
    },
  },
};
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.main ul {
  display: flex;
  flex-direction: column;
}
.main li {
  display: flex;
  align-items: center;
  width: 100%;
}

.table {
  padding: 0;
}

table tr {
  display: flex;
  padding: 0;
}

tr:hover > td {
  background-color: var(--border-color) !important;
  color: white;
  cursor: pointer;
}

header {
  min-height: 4rem;
}

#img-form {
  display: flex;
  overflow: auto;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  min-height: 435px;
}

.svgview {
  width: 600px;
  height: 200px;
  box-sizing: border-box;
  border: 2px dotted black;
}
</style>
