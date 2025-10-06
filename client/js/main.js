/**
 * 01V96 Remote
 * @author Michael Strobel, michael@kryops.de
 */
var remoteApp = {
  /*
   * PROPERTIES
   */

  /**
   * application-wide configuration
   */
  config: {
    // Detect if running on mobile device
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && !/Electron/i.test(navigator.userAgent),
    // WebSocket server location
    socketHost: window.location.hostname,
    socketPort: 1338,

    // maximal CSS top value for .fader-handle elements
    maxHandlePercent: 85,

    // maximal value for fader messages
    maxFaderValue: 255,

    // height difference #content-.fader for computation fallback [e.g. CSS calc(100% - 210px)]
    faderHeightDifference: 210,

    // minimum distance to send fader change value
    faderMoveMinValueDistance: 5,

    // maximal value for level display
    maxLevelValue: 32,

    // channel, aux and bus count
    channelCount: 32,
    auxCount: 8,
    busCount: 8,

    /**
     * configuration for initial tabs and controls
     *
     * tab-id: {
     *	label: tab-label
     *	fader: [
     *		[target, number, big label, number2]
     *	]
     * }
     * targets: channel, sum, aux, bus
     */
    controls: {
      ch116: {
        label: "CH 1-16",
        faders: [
          ["channel", 1, "Mic1"],
          ["channel", 2, "Mic2"],
          ["channel", 3, "Mic3"],
          ["channel", 4, "Mic4"],
          ["channel", 5, "5"],
          ["channel", 6, "6"],
          ["channel", 7, "7"],
          ["channel", 8, "8"],
          ["channel", 9, "9"],
          ["channel", 10, "10"],
          ["channel", 11, "11"],
          ["channel", 12, "12"],
          ["channel", 13, "13"],
          ["channel", 14, "14"],
          ["channel", 15, "15"],
          ["channel", 16, "16"],
          ["sum", 0, "S"],
        ],
      },

      ch1732: {
        label: "CH 17-32",
        faders: [
          ["channel", 17, "17"],
          ["channel", 18, "18"],
          ["channel", 19, "19"],
          ["channel", 20, "20"],
          ["channel", 21, "21"],
          ["channel", 22, "22"],
          ["channel", 23, "23"],
          ["channel", 24, "24"],
          ["channel", 25, "25"],
          ["channel", 26, "26"],
          ["channel", 27, "27"],
          ["channel", 28, "28"],
          ["channel", 29, "29"],
          ["channel", 30, "30"],
          ["channel", 31, "31"],
          ["channel", 32, "32"],
          ["sum", 0, "S"],
        ],
      },

      aux1: {
        label: "AUX 1",
        faders: [
          ["auxsend", 1, "1", 1],
          ["auxsend", 2, "2", 1],
          ["auxsend", 3, "3", 1],
          ["auxsend", 4, "4", 1],
          ["auxsend", 5, "5", 1],
          ["auxsend", 6, "6", 1],
          ["auxsend", 7, "7", 1],
          ["auxsend", 8, "8", 1],
          ["auxsend", 9, "9", 1],
          ["auxsend", 10, "10", 1],
          ["auxsend", 11, "11", 1],
          ["auxsend", 12, "12", 1],
          ["auxsend", 13, "13", 1],
          ["auxsend", 14, "14", 1],
          ["auxsend", 15, "15", 1],
          ["auxsend", 16, "16", 1],
          ["sum", 0, "S"],
        ],
      },

      aux2: {
        label: "AUX 2",
        faders: [
          ["auxsend", 1, "1", 2],
          ["auxsend", 2, "2", 2],
          ["auxsend", 3, "3", 2],
          ["auxsend", 4, "4", 2],
          ["auxsend", 5, "5", 2],
          ["auxsend", 6, "6", 2],
          ["auxsend", 7, "7", 2],
          ["auxsend", 8, "8", 2],
          ["auxsend", 9, "9", 2],
          ["auxsend", 10, "10", 2],
          ["auxsend", 11, "11", 2],
          ["auxsend", 12, "12", 2],
          ["auxsend", 13, "13", 2],
          ["auxsend", 14, "14", 2],
          ["auxsend", 15, "15", 2],
          ["auxsend", 16, "16", 2],
          ["sum", 0, "S"],
        ],
      },

      aux3: {
        label: "AUX 3",
        faders: [
          ["auxsend", 1, "1", 3],
          ["auxsend", 2, "2", 3],
          ["auxsend", 3, "3", 3],
          ["auxsend", 4, "4", 3],
          ["auxsend", 5, "5", 3],
          ["auxsend", 6, "6", 3],
          ["auxsend", 7, "7", 3],
          ["auxsend", 8, "8", 3],
          ["auxsend", 9, "9", 3],
          ["auxsend", 10, "10", 3],
          ["auxsend", 11, "11", 3],
          ["auxsend", 12, "12", 3],
          ["auxsend", 13, "13", 3],
          ["auxsend", 14, "14", 3],
          ["auxsend", 15, "15", 3],
          ["auxsend", 16, "16", 3],
          ["sum", 0, "S"],
        ],
      },

      aux4: {
        label: "AUX 4",
        faders: [
          ["auxsend", 1, "1", 4],
          ["auxsend", 2, "2", 4],
          ["auxsend", 3, "3", 4],
          ["auxsend", 4, "4", 4],
          ["auxsend", 5, "5", 4],
          ["auxsend", 6, "6", 4],
          ["auxsend", 7, "7", 4],
          ["auxsend", 8, "8", 4],
          ["auxsend", 9, "9", 4],
          ["auxsend", 10, "10", 4],
          ["auxsend", 11, "11", 4],
          ["auxsend", 12, "12", 4],
          ["auxsend", 13, "13", 4],
          ["auxsend", 14, "14", 4],
          ["auxsend", 15, "15", 4],
          ["auxsend", 16, "16", 4],
          ["sum", 0, "S"],
        ],
      },

      aux5: {
        label: "AUX 5",
        faders: [
          ["auxsend", 1, "1", 5],
          ["auxsend", 2, "2", 5],
          ["auxsend", 3, "3", 5],
          ["auxsend", 4, "4", 5],
          ["auxsend", 5, "5", 5],
          ["auxsend", 6, "6", 5],
          ["auxsend", 7, "7", 5],
          ["auxsend", 8, "8", 5],
          ["auxsend", 9, "9", 5],
          ["auxsend", 10, "10", 5],
          ["auxsend", 11, "11", 5],
          ["auxsend", 12, "12", 5],
          ["auxsend", 13, "13", 5],
          ["auxsend", 14, "14", 5],
          ["auxsend", 15, "15", 5],
          ["auxsend", 16, "16", 5],
          ["sum", 0, "S"],
        ],
      },

      aux6: {
        label: "AUX 6",
        faders: [
          ["auxsend", 1, "1", 6],
          ["auxsend", 2, "2", 6],
          ["auxsend", 3, "3", 6],
          ["auxsend", 4, "4", 6],
          ["auxsend", 5, "5", 6],
          ["auxsend", 6, "6", 6],
          ["auxsend", 7, "7", 6],
          ["auxsend", 8, "8", 6],
          ["auxsend", 9, "9", 6],
          ["auxsend", 10, "10", 6],
          ["auxsend", 11, "11", 6],
          ["auxsend", 12, "12", 6],
          ["auxsend", 13, "13", 6],
          ["auxsend", 14, "14", 6],
          ["auxsend", 15, "15", 6],
          ["auxsend", 16, "16", 6],
          ["sum", 0, "S"],
        ],
      },

      aux7: {
        label: "AUX 7",
        faders: [
          ["auxsend", 1, "1", 7],
          ["auxsend", 2, "2", 7],
          ["auxsend", 3, "3", 7],
          ["auxsend", 4, "4", 7],
          ["auxsend", 5, "5", 7],
          ["auxsend", 6, "6", 7],
          ["auxsend", 7, "7", 7],
          ["auxsend", 8, "8", 7],
          ["auxsend", 9, "9", 7],
          ["auxsend", 10, "10", 7],
          ["auxsend", 11, "11", 7],
          ["auxsend", 12, "12", 7],
          ["auxsend", 13, "13", 7],
          ["auxsend", 14, "14", 7],
          ["auxsend", 15, "15", 7],
          ["auxsend", 16, "16", 7],
          ["sum", 0, "S"],
        ],
      },

      aux8: {
        label: "AUX 8",
        faders: [
          ["auxsend", 1, "1", 8],
          ["auxsend", 2, "2", 8],
          ["auxsend", 3, "3", 8],
          ["auxsend", 4, "4", 8],
          ["auxsend", 5, "5", 8],
          ["auxsend", 6, "6", 8],
          ["auxsend", 7, "7", 8],
          ["auxsend", 8, "8", 8],
          ["auxsend", 9, "9", 8],
          ["auxsend", 10, "10", 8],
          ["auxsend", 11, "11", 8],
          ["auxsend", 12, "12", 8],
          ["auxsend", 13, "13", 8],
          ["auxsend", 14, "14", 8],
          ["auxsend", 15, "15", 8],
          ["auxsend", 16, "16", 8],
          ["sum", 0, "S"],
        ],
      },

      master: {
        label: "MASTER",
        faders: [
          ["aux", 1, "A1"],
          ["aux", 2, "A2"],
          ["aux", 3, "A3"],
          ["aux", 4, "A4"],
          ["aux", 5, "A5"],
          ["aux", 6, "A6"],
          ["aux", 7, "A7"],
          ["aux", 8, "A8"],
          ["bus", 1, "B1"],
          ["bus", 2, "B2"],
          ["bus", 3, "B3"],
          ["bus", 4, "B4"],
          ["bus", 5, "B5"],
          ["bus", 6, "B6"],
          ["bus", 7, "B7"],
          ["bus", 8, "B8"],
          ["sum", 0, "S"],
        ],
      },
    },

    /**
     * persistent configuration that is stored on the server
     */
    persistent: {
      names: {},
      groups: [],
    },
  },

  /**
   * current application status
   */
  status: {
    /*
     * control status; control-id = target+num2+num
     * control-id: value
     */

    // current status of the on-buttons
    on: {},

    // current fader values
    fader: {},

    // current channel levels
    level: {},

    // id of the currently active tab
    activeTab: false,

    // current height of a fader; used for value computation when dragging handle
    faderHeight: 0,

    // currently moved faders [id: true]; disabled automatic repositioning on value change
    movedFaders: {},

    // initial waiting for document.ready and socket initialization
    pendingOperations: 2,
  },

  /**
   * WebSocket connection to the server
   * @property {WebSocket}
   */
  connection: false,

  /*
   * METHODS
   */

  /**
   * initializes the application
   */
  init: function () {
    var app = this;

    // Apply saved orientation preference
    app.applySavedOrientation();

    // Show orientation selection for mobile devices
    app.showOrientationSelection();

    // Parse URL parameters
    app.parseUrlParameters();

    app.openSocketConnection();

    // generate content and bind event handlers when page is loaded
    $(document).ready(function () {
      app.bindGlobalEventHandlers();
      app.generatePage();
      app.refreshFaderHeight();

      app.start();
    });
  },

  /**
   * Applies saved orientation preference
   */
  applySavedOrientation: function () {
    var app = this;

    // Only apply on mobile devices
    if (!app.config.isMobile) {
      return;
    }

    // Check if user has already made a choice
    var orientationChoice = localStorage.getItem('orientationChoice');
    if (orientationChoice) {
      // Apply the saved choice
      if (orientationChoice === 'landscape') {
        $('body').addClass('landscape-mode');
      } else {
        $('body').addClass('portrait-mode');
      }
    }
  },

  /**
   * Shows orientation selection for mobile devices
   */
  showOrientationSelection: function () {
    var app = this;

    // Only show on mobile devices, not on desktop or Electron
    if (!app.config.isMobile) {
      return;
    }

    // Check if user has already made a choice
    var orientationChoice = localStorage.getItem('orientationChoice');
    if (orientationChoice) {
      return; // User has already made a choice
    }

    // Create orientation selection overlay
    var selectionHtml =
      '<div id="orientation-selection" style="' +
        'position: fixed;' +
        'top: 0;' +
        'left: 0;' +
        'width: 100%;' +
        'height: 100%;' +
        'background: linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%);' +
        'color: white;' +
        'display: flex;' +
        'flex-direction: column;' +
        'align-items: center;' +
        'justify-content: center;' +
        'z-index: 9999;' +
        'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;' +
        'text-align: center;' +
        'padding: 2rem;' +
        '-webkit-backdrop-filter: blur(10px);' +
        'backdrop-filter: blur(10px);' +
      '">' +
        '<div style="font-size: 2.5rem; margin-bottom: 1rem;">📱</div>' +
        '<h2 style="font-size: 1.5rem; font-weight: 600; margin: 0 0 1rem 0; color: #60a5fa;">' +
          'Escolha a sua orientação preferida' +
        '</h2>' +
        '<p style="font-size: 1rem; margin: 0 0 2rem 0; line-height: 1.5; color: rgba(255, 255, 255, 0.8);' +
           'max-width: 300px;">' +
          'Selecione como gostaria de usar a mesa de mistura. Pode alterar isto mais tarde nas definições.' +
        '</p>' +

        '<div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">' +
          '<button id="portrait-btn" style="' +
            'background: linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(37, 99, 235, 0.8) 100%);' +
            'border: 2px solid rgba(59, 130, 246, 0.9);' +
            'color: white;' +
            'padding: 1rem 2rem;' +
            'border-radius: 1rem;' +
            'font-size: 1rem;' +
            'font-weight: 600;' +
            'cursor: pointer;' +
            'transition: all 0.3s ease;' +
            'box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);' +
            'display: flex;' +
            'flex-direction: column;' +
            'align-items: center;' +
            'gap: 0.5rem;' +
            'min-width: 120px;' +
          '">' +
            '<div style="font-size: 2rem;">📱</div>' +
            '<div>Retrato</div>' +
            '<div style="font-size: 0.8rem; opacity: 0.8;">Rolamento vertical</div>' +
          '</button>' +

          '<button id="landscape-btn" style="' +
            'background: linear-gradient(135deg, rgba(34, 197, 94, 0.8) 0%, rgba(16, 185, 129, 0.8) 100%);' +
            'border: 2px solid rgba(34, 197, 94, 0.9);' +
            'color: white;' +
            'padding: 1rem 2rem;' +
            'border-radius: 1rem;' +
            'font-size: 1rem;' +
            'font-weight: 600;' +
            'cursor: pointer;' +
            'transition: all 0.3s ease;' +
            'box-shadow: 0 4px 12px rgba(34, 197, 94, 0.4);' +
            'display: flex;' +
            'flex-direction: column;' +
            'align-items: center;' +
            'gap: 0.5rem;' +
            'min-width: 120px;' +
          '">' +
            '<div style="font-size: 2rem; transform: rotate(90deg);">📱</div>' +
            '<div>Paisagem</div>' +
            '<div style="font-size: 0.8rem; opacity: 0.8;">Rolamento horizontal</div>' +
          '</button>' +
        '</div>' +

        '<div style="margin-top: 2rem; font-size: 0.875rem; color: rgba(255, 255, 255, 0.6);">' +
          '💡 Dica: O modo paisagem proporciona uma melhor experiência de controlo da mesa de mistura' +
        '</div>' +
      '</div>';

    $('body').append(selectionHtml);

    // Bind click handlers
    $('#portrait-btn').on('click', function() {
      app.setOrientationMode('portrait');
    });

    $('#landscape-btn').on('click', function() {
      app.setOrientationMode('landscape');
    });
  },

  /**
   * Sets the orientation mode and applies appropriate styles
   */
  setOrientationMode: function(mode) {
    var app = this;

    // Save user's choice
    localStorage.setItem('orientationChoice', mode);

    // Remove selection overlay
    $('#orientation-selection').fadeOut(300, function() {
      $(this).remove();
    });

    // Apply orientation-specific styles
    if (mode === 'landscape') {
      $('body').addClass('landscape-mode');
    } else {
      $('body').addClass('portrait-mode');
    }

    // Refresh fader heights after orientation change
    setTimeout(function() {
      app.refreshFaderHeight();
    }, 350);
  },

  /**
   * Parse URL parameters to determine which aux channel to show
   */
  parseUrlParameters: function () {
    var urlParams = new URLSearchParams(window.location.search);
    var auxParam = urlParams.get("aux");
    var adminParam = urlParams.get("admin");

    // Store the selected aux channel or admin mode
    if (adminParam !== null) {
      this.config.selectedAux = "admin";
    } else if (auxParam !== null) {
      var auxNum = parseInt(auxParam);
      if (auxNum >= 1 && auxNum <= 8) {
        this.config.selectedAux = auxNum;
      }
    }
  },

  /**
   * counts down the pendingOperations status and syncs with the mixer
   * when the entire application is loaded
   */
  start: function () {
    // start after socket init and document.ready
    this.status.pendingOperations--;

    if (this.status.pendingOperations > 0) {
      return;
    }

    // sync with mixer
    $("#loading-dialog-text").html("A sincronizar com a mesa de mistura...");

    this.sendMessage({
      type: "sync",
    });

    // load configuration

    this.sendMessage({
      type: "config",
    });

    this.hideError();
  },

  /**
   * opens the WebSocket and binds message and error handlers
   */
  openSocketConnection: function () {
    var app = this;

    window.WebSocket = window.WebSocket || window.MozWebSocket;

    if (!window.WebSocket) {
      $(document).ready(function () {
        app.displayError(
          "O seu navegador não suporta WebSockets!<br />Por favor, use um navegador moderno como o Mozilla Firefox ou o Google Chrome."
        );
      });

      return;
    }

    app.connection = new WebSocket(
      "ws://" + app.config.socketHost + ":" + app.config.socketPort
    );

    app.connection.onopen = function () {
      app.start();
    };

    app.connection.onerror = function (error) {
      console.log("WebSocket error", error);
      app.displayError("Ocorreu um erro de WebSocket!", true);
    };

    app.connection.onclose = function () {
      app.displayError("A ligação ao servidor foi perdida!", true);
      window.setTimeout(function () {
        app.openSocketConnection();
      }, 1000);
    };

    app.connection.onmessage = function (message) {
      try {
        app.messageHandler(JSON.parse(message.data));
      } catch (e) {
        console.log(e);
        console.log("invalid JSON WebSocket message!");
      }
    };
  },

  /**
   * generates the navigation tabs and controls
   * can be run again when the configuration changes
   */
  generatePage: function () {
    var app = this,
      generateControl = function (tab, target, num, bigLabel, num2) {
        var id = target + (num2 || "") + num;

        // set intial status values
        if (typeof app.status.on[id] == "undefined") {
          app.status.fader[id] = app.config.maxFaderValue;

          if (target != "auxsend") {
            app.status.on[id] = true;
            app.status.level[id] = 0;
          }
        }

        // generate HTML
        return (
          '<div class="control" data-id="' +
          id +
          '" data-target="' +
          target +
          '" data-number="' +
          num +
          '" data-number2="' +
          (num2 || 0) +
          '">\
				<div class="on-button">ON</div>\
				<div class="control-warning-badge" style="display:none;"></div>\
					\
					<div class="fader-biglabel">' +
          bigLabel +
          '</div>\
				\
				<div class="fader-label">&nbsp;</div>\
				\
				<div class="fader-controls">\
						<button class="fader-btn fader-btn-plus" data-action="increase">+</button>\
						\
						<div class="fader">\
							<div class="fader-bar">\
								<div class="fader-background"></div>\
								<div class="fader-level" style="height:100%"></div>\
								<div class="fader-level-warning"></div>\
							</div>\
							\
							<div class="fader-handle' +
          (target == "sum" ? " fader-handle-sum" : "") +
          '"></div>\
						</div>\
						\
						<button class="fader-btn fader-btn-minus" data-action="decrease">-</button>\
					</div>\
				</div>'
        );
      },
      generateTab = function (id, label, title, active) {
        if (active) {
          app.status.activeTab = id;
        }

        return (
          '<li data-tab="' +
          id +
          '"' +
          (title ? ' title="' + title + '"' : "") +
          ' class="autogenerated' +
          (active ? " active" : "") +
          '">' +
          label +
          "</li>"
        );
      },
      generateConfigurationInput = function (id, label) {
        return (
          '<p class="autogenerated"><label>' +
          label +
          '</label><input type="text" data-id="' +
          id +
          '" /></p>'
        );
      },
      naviHtml = "",
      contentHtml = "",
      configChannelHtml = "",
      configMasterHtml = "",
      tabid,
      i,
      tab,
      fader,
      tabIsActive,
      activeTabSelected = !!app.status.activeTab,
      firstTab = true;

    // remove perviously auto-generated elements if method is called multiple times
    $(".autogenerated").remove();

    // generate tabs and controls

    for (tabid in app.config.controls) {
      if (app.config.controls.hasOwnProperty(tabid)) {
        tab = app.config.controls[tabid];

        // Filter tabs based on selected aux channel
        var shouldShowTab = true;

        if (app.config.selectedAux && app.config.selectedAux !== "admin") {
          // Only show the selected aux channel tab
          if (tabid.indexOf("aux") === 0) {
            var tabAuxNum = parseInt(tabid.replace("aux", ""));
            shouldShowTab = tabAuxNum === app.config.selectedAux;
          } else {
            // Hide other tabs (ch116, ch1732, master) when aux is selected
            shouldShowTab = false;
          }
        }

        if (!shouldShowTab) {
          continue;
        }

        tabIsActive = activeTabSelected
          ? app.status.activeTab === tabid
          : firstTab;

        naviHtml += generateTab(tabid, tab.label, tab.title, tabIsActive);

        contentHtml +=
          '<div class="tabcontent autogenerated" data-tab="' +
          tabid +
          '"' +
          (tabIsActive ? ' style="display:block"' : "") +
          ">";

        for (i = 0; i < tab.faders.length; i++) {
          fader = tab.faders[i];
          contentHtml += generateControl(
            tabid,
            fader[0],
            fader[1],
            fader[2],
            fader[3]
          );
        }

        contentHtml += "</div>";

        firstTab = false;
      }
    }

    // generate configuration inputs

    for (i = 1; i <= app.config.channelCount; i++) {
      configChannelHtml += generateConfigurationInput("channel" + i, i);
    }

    for (i = 1; i <= app.config.auxCount; i++) {
      configMasterHtml += generateConfigurationInput("aux" + i, "A" + i);
    }

    for (i = 1; i <= app.config.busCount; i++) {
      configMasterHtml += generateConfigurationInput("bus" + i, "B" + i);
    }

    $("#navi").prepend(naviHtml).removeClass("hidden");
    $("#content").append(contentHtml);
    $("#configuration_channels").html(configChannelHtml);
    $("#configuration_master").html(configMasterHtml);

    // update controls in the currently active tab
    // to display the right values when the method has been called again
    app.updateTabControls();

    app.bindDynamicEventHandlers();

    app.refreshConfiguration();
  },

  /**
   * binds event handlers for
   * 	fader dragging
   *	on-buttons
   *	tab navigation
   *	fader height computation on window resize
   */
  bindGlobalEventHandlers: function () {
    var app = this,
      $content = $("#content"),
      $navi = $("#navi");

    // add mouse fader events only when pointer events are unavailable

    if (!window.navigator.msPointerEnabled && !window.PointerEvent) {
      // fader mouse events
      $content.on("mousedown", ".fader", function (e) {
        app.eventAbstraction.faderStart($(this).parents(".control"), e.pageY);
      });

      $content.on("mousemove", function (e) {
        var fader = false,
          i;

        for (i in app.status.movedFaders) {
          if (
            app.status.movedFaders.hasOwnProperty(i) &&
            app.status.movedFaders[i]
          ) {
            fader = i;
            break;
          }
        }

        if (!fader) {
          return;
        }

        app.eventAbstraction.faderMove(
          $content.find('.control[data-id="' + fader + '"]'),
          e.pageY
        );
      });

      $(document).on("mouseup", function () {
        app.status.movedFaders = {};
      });
    }

    // on-buttons
    $content.on("click", ".on-button", function () {
      app.eventAbstraction.onButton($(this).parents(".control"));
    });

    // fader +/- buttons
    $content.on("click", ".fader-btn", function (e) {
      e.preventDefault();
      e.stopPropagation();

      var $btn = $(this);
      var $control = $btn.parents(".control");
      var action = $btn.data("action");

      app.eventAbstraction.faderButton($control, action);
    });

    // tab navigation
    $navi.on("click", "li", function () {
      var $this = $(this);

      if ($this.data("tab")) {
        app.switchTab($this.data("tab"), $this);
      }
      // fullscreen navigation item
      else if ($this.attr("id") == "toggle-fullscreen") {
        app.toggleFullScreen();
      }
    });

    // re-compute fader height on window resize
    $(window).on("resize", function () {
      app.refreshFaderHeight();
    });

    // configuration
    $("#configuration_save").click(function () {
      app.saveConfiguration();
    });
  },

  /**
   * bind touch event handlers for dynamically generated controls
   * - faders
   * - on-buttons
   */
  bindDynamicEventHandlers: function () {
    var app = this;

    // move faders

    [].forEach.call(document.querySelectorAll(".fader"), function (el) {
      var $control = $(el).parents(".control");

      // standard touch events
      if (!window.navigator.msPointerEnabled && !window.PointerEvent) {
        el.addEventListener(
          "touchstart",
          function (e) {
            e.preventDefault();
            e.stopPropagation();

            app.eventAbstraction.faderStart($control, e.targetTouches[0].pageY);
          },
          false
        );

        el.addEventListener(
          "touchmove",
          function (e) {
            e.preventDefault();
            e.stopPropagation();

            app.eventAbstraction.faderMove($control, e.targetTouches[0].pageY);
          },
          false
        );

        el.addEventListener(
          "touchend",
          function (e) {
            e.preventDefault();
            e.stopPropagation();

            app.eventAbstraction.faderStop($control);
          },
          false
        );
      }
      // MSIE pointer events
      else {
        var pointerdown = function (e) {
            e.preventDefault();
            e.stopPropagation();

            // capture pointer on the element it started to ensure
            // that the pointer
            e.target.setPointerCapture(e.pointerId);

            app.eventAbstraction.faderStart($control, e.clientY);
          },
          pointermove = function (e) {
            e.preventDefault();
            e.stopPropagation();

            app.eventAbstraction.faderMove($control, e.clientY);
          },
          pointerup = function (e) {
            e.preventDefault();
            e.stopPropagation();

            app.eventAbstraction.faderStop($control);
          };

        if (window.PointerEvent) {
          el.addEventListener("pointerdown", pointerdown, false);
          el.addEventListener("pointermove", pointermove, false);
          el.addEventListener("pointerup", pointerup, false);
        } else {
          el.addEventListener("MSPointerDown", pointerdown, false);
          el.addEventListener("MSPointerMove", pointermove, false);
          el.addEventListener("MSPointerUp", pointerup, false);
        }
      }
    });
  },

  eventAbstraction: {
    /**
     * touchstart/mousedown/pointerdown/MSPointerDown on fader
     * @param $control {jQuery} .control object
     * @param position {int} y touch/mouse position
     */
    faderStart: function ($control, position) {
      var app = remoteApp;

      app.status.movedFaders[$control.data("id")] = true;
      $control.data(
        "originalPosition",
        $control.find(".fader-handle").position().top
      );
      $control.data("touchPosition", position);
    },

    /**
     * touchmove/mousemove/pointermove/MSPointerMove on fader
     * @param $control {jQuery} .control object
     * @param position {int} y touch/mouse position
     */
    faderMove: function ($control, position) {
      var app = remoteApp,
        $handle = $control.find(".fader-handle"),
        id = $control.data("id"),
        target = $control.data("target"),
        num = $control.data("number"),
        num2 = $control.data("number2"),
        $controls = $(".control:visible"),
        groupId,
        i,
        j;

      if (!app.status.movedFaders[id]) {
        return;
      }

      // compute and apply position
      var newPositionPx =
          $control.data("originalPosition") +
          position -
          $control.data("touchPosition"),
        newPositionPercent = (newPositionPx / app.status.faderHeight) * 100,
        newValue;

      if (newPositionPercent < 0) {
        newPositionPercent = 0;
      } else if (newPositionPercent > app.config.maxHandlePercent) {
        newPositionPercent = app.config.maxHandlePercent;
      }

      $handle.css("top", newPositionPercent + "%");

      // compute and send new value
      newValue = Math.round(
        (1 - newPositionPercent / app.config.maxHandlePercent) *
          app.config.maxFaderValue
      );

      // send only changed values
      if (
        Math.abs(newValue - app.status.fader[id]) <
        app.config.faderMoveMinValueDistance
      ) {
        return;
      }

      app.status.fader[id] = newValue;

      // apply to all faders of group
      if (target === "channel" || target === "auxsend") {
        i = app.config.persistent.groups.length;

        while (i--) {
          if (app.config.persistent.groups[i].indexOf(num) !== -1) {
            j = app.config.persistent.groups[i].length;

            while (j--) {
              groupId = app.config.persistent.groups[i][j];

              if (groupId !== num) {
                app.status.fader[target + (num2 || "") + groupId] = newValue;
                $controls
                  .filter(
                    '[data-target="' +
                      target +
                      '"][data-number="' +
                      groupId +
                      '"]'
                  )
                  .find(".fader-handle")
                  .css("top", newPositionPercent + "%");
              }
            }

            break;
          }
        }
      }

      app.sendControlMessage("fader", target, num, newValue, num2);
    },

    /**
     * touchstop/mouseup/pointerup/MSPointerUp
     * @param $control
     */
    faderStop: function ($control) {
      remoteApp.status.movedFaders[$control.data("id")] = false;
    },

    /**
     * touch/click on-button
     * @param $control {jQuery} .control object
     */
    onButton: function ($control) {
      var app = remoteApp,
        id = $control.data("id"),
        target = $control.data("target"),
        num = parseInt($control.data("number")),
        newValue = !app.status.on[id],
        $controls = $(".control:visible"),
        i,
        j,
        groupId;

      // override aux sends: toggle channel on-status
      if (target == "auxsend") {
        id = "channel" + num;
        target = "channel";
        newValue = !app.status.on[id];
      }

      app.status.on[id] = newValue;

      if (newValue) {
        $control.removeClass("control-disabled");
      } else {
        $control.addClass("control-disabled");
      }

      // apply to all buttons of group
      if (target === "channel") {
        i = app.config.persistent.groups.length;

        while (i--) {
          if (app.config.persistent.groups[i].indexOf(num) !== -1) {
            j = app.config.persistent.groups[i].length;

            while (j--) {
              groupId = app.config.persistent.groups[i][j];

              if (groupId !== num) {
                app.status.on["channel" + groupId] = newValue;

                if (newValue) {
                  $controls
                    .filter('[data-number="' + groupId + '"]')
                    .removeClass("control-disabled");
                } else {
                  $controls
                    .filter('[data-number="' + groupId + '"]')
                    .addClass("control-disabled");
                }
              }
            }

            break;
          }
        }
      }

      app.sendControlMessage("on", target, $control.data("number"), newValue);
    },

    /**
     * click on fader +/- button
     * @param $control {jQuery} .control object
     * @param action {string} 'increase' or 'decrease'
     */
    faderButton: function ($control, action) {
      var app = remoteApp,
        id = $control.data("id"),
        target = $control.data("target"),
        num = $control.data("number"),
        num2 = $control.data("number2"),
        $handle = $control.find(".fader-handle"),
        currentValue = app.status.fader[id],
        percentChange = 0.05, // 5% change
        valueChange = Math.round(app.config.maxFaderValue * percentChange),
        newValue;

      // Calculate new value
      if (action === "increase") {
        newValue = currentValue + valueChange;
      } else if (action === "decrease") {
        newValue = currentValue - valueChange;
      }

      // Clamp value between 0 and max
      if (newValue < 0) {
        newValue = 0;
      } else if (newValue > app.config.maxFaderValue) {
        newValue = app.config.maxFaderValue;
      }

      // Update status
      app.status.fader[id] = newValue;

      // Update visual position
      var newPositionPercent =
        (1 - newValue / app.config.maxFaderValue) * app.config.maxHandlePercent;
      $handle.css("top", newPositionPercent + "%");

      // Send control message
      app.sendControlMessage("fader", target, num, newValue, num2);
    },
  },

  /**
   * refreshes the height of faders when window resizes
   * used for value computation after dragging
   */
  refreshFaderHeight: function () {
    var app = this,
      $firstFader = $(".fader:visible").first();

    if ($firstFader.length) {
      app.status.faderHeight = $firstFader.height();
    } else {
      // fallback when no faders are visible: compute with container height
      app.status.faderHeight =
        $("#content").height() - app.config.faderHeightDifference;
    }
  },

  /**
   * switches to the tab with the given id
   * @param {String} id
   * @param {jQuery} $this optional jQuery object of the selected tab
   */
  switchTab: function (id, $this) {
    var app = this,
      $navi = $("#navi"),
      $tab = $this || $navi.find('li[data-tab="' + id + '"]'),
      id = $tab.data("tab");

    app.updateTabControls(id);

    $('.tabcontent[data-tab="' + app.status.activeTab + '"]').hide();
    $navi
      .find('[data-tab="' + app.status.activeTab + '"]')
      .removeClass("active");

    $('.tabcontent[data-tab="' + id + '"]').show();
    $tab.addClass("active");

    app.status.activeTab = id;
  },

  /**
   * handles socket messages, updates application status and control displays
   * @param {object} message
   *		properties: type (on, fader, level), target (channel, sum, aux, bus, auxsend), num, num2, value
   */
  messageHandler: function (message) {
    var app = this,
      id = message.target
        ? message.target + (message.num2 || "") + message.num
        : false,
      controlIsVisible = false,
      controls,
      i,
      updateType;

    // update all levels with one message
    if (message.type === "level") {
      for (i in message.levels) {
        app.status.level["channel" + i] = message.levels[i];
      }

      app.updateTabControls(false, { level: true });
    }
    // complete sync
    else if (message.type === "sync") {
      app.status.fader = message.status.fader;
      app.status.on = message.status.on;

      app.updateTabControls(false, { fader: true, on: true });

      $("#loading-dialog").fadeOut(400);
    }
    // configuration
    else if (message.type === "config") {
      app.config.persistent = message.config;
      app.refreshConfiguration();
    }
    // update fader and on-button per channel
    else if (
      app.status[message.type] &&
      app.status[message.type][id] !== message.value
    ) {
      // determine if control is currently visible
      if (app.config.controls[app.status.activeTab]) {
        controls = app.config.controls[app.status.activeTab].faders;

        for (i in controls) {
          if (
            controls[i][0] == message.target &&
            (!message.num || controls[i][1] == message.num) &&
            (!message.num2 || controls[i][3] == message.num2)
          ) {
            controlIsVisible = true;
          } else if (
            controls[i][0] == "auxsend" &&
            controls[i][1] == message.num
          ) {
            controlIsVisible = true;
          }
        }
      }

      app.status[message.type][id] = message.value;

      if (controlIsVisible) {
        updateType = {};
        updateType[message.type] = true;

        app.updateControl(
          message.target,
          message.num,
          message.num2,
          updateType
        );
      }
    }
  },

  /**
   * update all controls in the selected tab
   * @param {String} tab tab-id, default currently active tab
   * @param {object} update @see remoteApp.updateControl()
   */
  updateTabControls: function (tab, update) {
    if (!tab) {
      tab = this.status.activeTab;
    }

    var app = this,
      $controls = $('.tabcontent[data-tab="' + tab + '"] .control');

    // refresh control status in new tab
    $controls.each(function () {
      app.updateControl(
        $(this).data("target"),
        $(this).data("number"),
        $(this).data("number2"),
        update
      );
    });
  },

  /**
   * updates a control to display its current values
   * @param {String} target channel, sum, aux, bus
   * @param {int} num
   * @param {int} num2
   * @param {object} update which values shall be updated (type: true); default all
   *		types: on, fader, level
   */
  updateControl: function (target, num, num2, update) {
    var app = this,
      id = target + (num2 || "") + num,
      oldId = id,
      $control = $('.control[data-id="' + id + '"]'),
      $onControl = $control,
      faderPercent,
      levelPercent;

    if (!update) {
      update = {
        on: true,
        fader: true,
        level: true,
      };
    }

    // update on-button status
    if (update.on) {
      if (target == "auxsend") {
        id = "channel" + num;
      }

      $onControl = $control.add(
        $('.control[data-target="auxsend"][data-number="' + num + '"]')
      );

      if (app.status.on[id]) {
        $onControl.removeClass("control-disabled");
      } else {
        $onControl.addClass("control-disabled");
      }

      id = oldId;
    }

    // update fader position if fader is not being moved
    if (update.fader && !app.status.movedFaders[id]) {
      faderPercent =
        (1 - app.status.fader[id] / app.config.maxFaderValue) *
        app.config.maxHandlePercent;
      $control.find(".fader-handle").css("top", faderPercent + "%");
    }

    // update displayed meter level
    if (update.level) {
      // show channel level on aux sends
      if (target == "auxsend") {
        id = "channel" + num;
      }

      var currentLevel = app.status.level[id] || 0;

      levelPercent =
        (1 -
          Math.pow(currentLevel, 2) / Math.pow(app.config.maxLevelValue, 2)) *
        100;
      $control.find(".fader-level").css("height", levelPercent + "%");

      // Update warning indicators based on level
      // Level ranges: 0-24 (safe/green), 25-30 (warning/yellow), 31-32 (danger/red)
      var $handle = $control.find(".fader-handle");
      var $warning = $control.find(".fader-level-warning");
      var $badge = $control.find(".control-warning-badge");

      // Remove all warning classes first
      $handle.removeClass("handle-warning-yellow handle-warning-red");
      $warning.removeClass("warning-yellow warning-red");
      $badge.removeClass("badge-yellow badge-red").hide();

      if (currentLevel >= 31) {
        // RED ZONE - Clipping/Distortion (above 0dB)
        $handle.addClass("handle-warning-red");
        $warning.addClass("warning-red");
        $badge.addClass("badge-red").text("!").show();

        // Calculate warning height (show red in bottom portion)
        var warningHeight = (1 - levelPercent / 100) * 100;
        $warning.css("height", Math.min(warningHeight, 30) + "%");
      } else if (currentLevel >= 25) {
        // YELLOW ZONE - Warning (approaching 0dB)
        $handle.addClass("handle-warning-yellow");
        $warning.addClass("warning-yellow");
        $badge.addClass("badge-yellow").text("⚠").show();

        // Calculate warning height (show yellow in bottom portion)
        var warningHeight = (1 - levelPercent / 100) * 100;
        $warning.css("height", Math.min(warningHeight, 25) + "%");
      } else {
        // GREEN ZONE - Safe levels
        $warning.css("height", "0%");
      }
    }
  },

  /**
   * refresh layout based on configuration
   * - fader names
   * - groups
   */
  refreshConfiguration: function () {
    var app = remoteApp,
      $config = $("#configuration"),
      groupVal = "",
      color,
      i,
      j;

    // names

    $(".fader-label").html("&nbsp;");
    $("#configuration").find('input[type="text"]').val("");

    for (i in app.config.persistent.names) {
      if (app.config.persistent.names.hasOwnProperty(i)) {
        $('.control[data-id="' + i + '"] .fader-label').html(
          app.config.persistent.names[i]
        );
        $(
          '.control[data-target="auxsend"][data-number="' +
            i.replace(/channel/, "") +
            '"] .fader-label'
        ).html(app.config.persistent.names[i]);
        $config
          .find('[data-id="' + i + '"]')
          .val(app.config.persistent.names[i]);
      }
    }

    // groups
    $(".control .group").css("background", "transparent");

    var getGroupColor = function (num) {
      var groupColors = [
        "#ff0000",
        "#ffff00",
        "#00ffff",
        "#00ff00",
        "#0000ff",
        "#ff00ff",
        "#fff",
      ];
      var rand = function () {
        return Math.round(55 + Math.random() * 200);
      };

      if (typeof groupColors[num] !== "undefined") {
        return groupColors[num];
      }

      return "rgb(" + rand() + "," + rand() + "," + rand() + ")";
    };

    for (i = 0; i < app.config.persistent.groups.length; i++) {
      groupVal += app.config.persistent.groups[i].join(",") + "\n";

      color = getGroupColor(i);
      j = app.config.persistent.groups[i].length;

      while (j--) {
        $(
          '.control[data-id="channel' +
            app.config.persistent.groups[i][j] +
            '"] .group'
        ).css("background", color);
        $(
          '.control[data-target="auxsend"][data-number="' +
            app.config.persistent.groups[i][j] +
            '"] .group'
        ).css("background", color);
      }
    }
    $("#configuration_groups").val(groupVal);

    $("#configuration_loading").hide();
  },

  /**
   * parse configuration from inputs, apply it and send it to the server
   */
  saveConfiguration: function () {
    var app = remoteApp,
      newConfig = {
        names: {},
        groups: [],
      },
      groups,
      i,
      j;

    // names

    $("#configuration")
      .find("input[data-id]")
      .each(function () {
        var val = $.trim($(this).val());

        if (val === "") {
          return;
        }

        newConfig.names[$(this).data("id")] = val;
      });

    // groups

    groups = $("#configuration_groups").val().split("\n");

    for (i = 0; i < groups.length; i++) {
      groups[i] = groups[i].replace(/[^\d,]/g, "");

      if (groups[i] !== "") {
        groups[i] = groups[i].split(",");

        j = groups[i].length;

        while (j--) {
          groups[i][j] = parseInt(groups[i][j]);

          if (
            isNaN(groups[i][j]) ||
            groups[i][j] < 1 ||
            groups[i][j] > app.config.channelCount
          ) {
            groups[i].splice(j, 1);
          }
        }

        if (groups[i].length <= 1) {
          continue;
        }

        newConfig.groups.push(groups[i]);
      }
    }

    app.config.persistent = newConfig;
    app.refreshConfiguration();

    app.sendMessage({
      type: "config_save",
      config: newConfig,
    });

    $("#configuration_save").html("Configuração guardada.");

    window.setTimeout(function () {
      $("#configuration_save").html("Guardar configuração");
    }, 5000);
  },

  /**
   * send WebSocket message to the server
   * @param {object} obj
   */
  sendMessage: function (obj) {
    if (typeof obj == "object") {
      this.connection.send(JSON.stringify(obj));
    } else {
      console.log("invalid socket output message: ", obj);
    }
  },

  /**
   * send message to the server
   * @param {string} type on, fader, level
   * @param {String} target channel, sum, aux, bus
   * @param {int} num default 0
   * @param {int} value default 0
   * @param {int} num2 default 0 [used for aux send]
   */
  sendControlMessage: function (type, target, num, value, num2) {
    this.sendMessage({
      type: type,
      target: target,
      num: num || 0,
      value: value || 0,
      num2: num2 || 0,
    });
  },

  /**
   * display error message
   * @param {String} message
   * @param {boolean} showRefreshButton
   */
  displayError: function (message, showRefreshButton) {
    $("#error-dialog-text").html(message);

    if (showRefreshButton) {
      $("#error-dialog-reload").show();
    } else {
      $("#error-dialog-reload").hide();
    }

    $("#error-dialog").fadeIn(1000);
  },

  hideError: function () {
    $("#error-dialog").fadeOut(1000);
  },
};

remoteApp.init();
