/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('tstaro2.view.main.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'tstaro2.view.main.MainController',
        'tstaro2.view.main.MainModel'
    ],

    xtype: 'app-main',
    
    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },

    items: [{
        region: 'north',
        xtype: 'component',
        cls: 'appBanner',
        padding: 10,
        height: 40,
        html: 'My Company - My Company Motto'          
    }, {
        xtype: 'panel',
        bind: {
            title: '{name}'
        },
        region: 'west',
        html: '<ul><li>This area is commonly used for navigation, for example, using a "tree" component.</li></ul>',
        width: 250,
        split: true,
        collapsible: true,
        tbar: [{
            text: 'Button',
            handler: 'onClickButton'
        }]
    },{
        region: 'center',
        xtype: 'tabpanel',
        items:[{
            title: 'Tab 1',
            html: '<h2>Content appropriate for the current navigation.</h2>'
        },{
            title: 'The Data',
            layout: 'fit',
            items: [{
                xtype: 'grid',
                title: '一覧',
                store: 'Books',
                columns: [
                    { xtype: 'rownumberer', width: 35 },
                    {
                        text: '貸', dataIndex: 'checkout', width: 20, renderer: function (value) {
                            if (value)
                                return '貸'
                        }
                    },
                    { text: '登録番号', dataIndex: 'regno', width: 70 },
                    { text: 'Title', dataIndex: 'Title', width: 160 },
                    { text: 'Author', dataIndex: 'Author', width: 80 },
                    { text: 'Publisher', dataIndex: 'Publisher', width: 80 },
                    { text: 'ページ', dataIndex: 'page', width: 30 },
                    { text: '定価', dataIndex: 'price', width: 40 },
                    {
                        text: '発行日', dataIndex: 'pubdate', width: 60, renderer: function (value) {
                            //if (value)
                            //    return Tstaro.util.Util.getDateStr(value)
                            return ''
                        }
                    },
                    { text: 'NDC', dataIndex: 'NDC', width: 50 },
                    { text: '分類', dataIndex: 'tags', width: 80 },
                    { text: '購入元', dataIndex: 'supplier', width: 80 },
                    {
                        text: '購入日', dataIndex: 'purchdate', width: 60, renderer: function (value) {
                            //if (value)
                            //    return Tstaro.util.Util.getDateStr(value)
                            return ''
                        }
                    },
                    {
                        text: '廃', dataIndex: 'void_p', width: 20, renderer: function (value) {
                            if (value)
                                return '廃'
                        }
                    }
                ]
            }]
        }]
    }]
});
