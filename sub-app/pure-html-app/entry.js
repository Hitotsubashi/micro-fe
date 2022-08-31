const render = $ => {
  try{
    console.log($('#purehtml-container'))
    $('#purehtml-container').html('Hello, render with jQuery');
  }catch(error){
    console.error(error)
  }
  return Promise.resolve();
};
  
(global => {
  global['purehtml'] = {
    bootstrap: () => {
      console.log('purehtml bootstrap');
      return Promise.resolve();
    },
    mount: () => {
      console.log('purehtml mount');
      return render($);
    },
    unmount: () => {
      console.log('purehtml unmount');
      return Promise.resolve();
    },
  };
})(window);