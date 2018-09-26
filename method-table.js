Vue.component("method-table", {
  props: ["points", "show", "valid"],
  template: `
    <table class="table is-fullwidth is-bordered is-striped" v-show="show">
      <thead>
        <tr>
          <th class="is-size-5">$$i$$</th>
          <th class="is-size-4">$$x_{i}$$</th>
          <th class="is-size-5">$$f(x_{i})$$</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(point, index) in points">
          <td>{{ index }}</td>
          <td>
            <div class="field">
              <div class="control">
                <input v-model="point.x" type="number" class="input" @change="$emit('hide-results')" @keyup="$emit('hide-results')" @keyup.13="$emit('calculate')">
              </div>
            </div>
          </td>
          <td>
            <div class="field">
              <div class="control">
                <input v-model="point.fx" type="number" class="input" @change="$emit('hide-results')" @keyup="$emit('hide-results')" @keyup.13="$emit('calculate')">
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    `,
});
