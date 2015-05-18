/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('tstaro2.Application', {
    extend: 'Ext.app.Application',
    
    name: 'tstaro2',

    stores: [
        // TODO: add global / shared stores here
        'Books'
    ],
    
    launch: function () {
        // TODO - Launch the application
    }
});
