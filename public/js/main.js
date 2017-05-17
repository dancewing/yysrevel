$(function(){

    var searchMonsters = function(){
      //reset highlight

      $('div.table').find('div.table-cell').each(function(){
          $(this).html($(this).text());
      });
      var searchValue = this.value;
      if (searchValue.length==0){
          $('div.table').find('div.table-row').each(function(){
              $(this).removeClass('hidden');
          });
      } else {
        $('div.table').find('div.table-row').each(function(){
            $(this).addClass('hidden');
        })

        $('div.table').find('div.table-cell:contains("'+ searchValue +'")').each(function(){
            $(this).parent().removeClass('hidden');
            $(this).parent().parent().find('.chapter-header').removeClass('hidden');
            $(this).html($(this).text().replace(searchValue, '<font color="red">'+searchValue+'</font>'));
        });

      }
    }

    var pgwBrowser = $.pgwBrowser();
    if (pgwBrowser.os.group == 'iOS' || pgwBrowser.os.group == 'Android' || pgwBrowser.os.group == 'Windows Phone') {
        $('#searchMonsters').bind('change', searchMonsters);
    } else {
        $('#searchMonsters').bind('keyup', searchMonsters);
    }

});
