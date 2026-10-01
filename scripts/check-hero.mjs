async function run() {
  const url = 'https://yqweaq94.api.sanity.io/v2024-03-01/data/query/production?query=' + encodeURIComponent('*[_type=="emirateHomePricing"][0].cards');
  const res = await fetch(url);
  const json = await res.json();
  console.log(JSON.stringify(json.result, null, 2));
}
run();
