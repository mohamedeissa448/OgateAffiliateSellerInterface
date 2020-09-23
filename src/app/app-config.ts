export const systemSettings = {
  // local server urls
  //serverURL: "http://localhost:3000",

  // Online server urls
  //serverURL: "http://35.198.191.127:4120",

  // Online Dev server urls
  serverURL: "http://35.198.191.127:4420",

  // empty data
  noDataHTML:'<p class="rxp-html-nodata"><i class="icon-info"></i> No Data Entered!</p>',
  // tiny editor configurations ; Old data quickbars
  tinyEditorConfiguration : {
    height: "600px",
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'searchreplace directionality link table charmap hr  anchor lists wordcount textpattern charmap',
    toolbar: 'undo redo | bold italic underline strikethrough superscript subscript formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor casechange permanentpen formatpainter removeformat | charmap hr | link  ltr rtl ',
    menubar: 'file edit view tools table',
    autosave_ask_before_unload: false
  }
};
