<!DOCTYPE html>
<html lang="en">
  <head>
      <meta charset="UTF-8">
<meta property="og:type" content="website">
<meta property="og:title" content="208427 - &lt;input&gt;'s hidden DIV shows up as event.originalTarget in click events">
<meta property="og:url" content="https://bugzilla.mozilla.org/show_bug.cgi?id=208427">
<meta property="og:description"
      content="RESOLVED (gregp) in Core - DOM: Events. Last updated 2026-01-13.">
<meta name="twitter:label1" value="Type">
<meta name="twitter:data1" value="defect">
<meta name="twitter:label2" value="Priority">
<meta name="twitter:data2" value="P5">

    

    <meta name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="color-scheme" content="dark light">
    <meta name="generator" content="Bugzilla 20260714.1">
    <meta name="bugzilla-global" content="dummy"
        id="bugzilla-global" data-bugzilla="{&quot;api_token&quot;:&quot;&quot;,&quot;config&quot;:{&quot;basepath&quot;:&quot;\/&quot;,&quot;cookie_consent_enabled&quot;:true,&quot;cookie_consent_required&quot;:false,&quot;essential_cookies&quot;:[&quot;bugzilla&quot;,&quot;Bugzilla_login&quot;,&quot;Bugzilla_logincookie&quot;,&quot;Bugzilla_login_request_cookie&quot;,&quot;github_state&quot;,&quot;github_token&quot;,&quot;mfa_verification_token&quot;,&quot;moz-consent-pref&quot;,&quot;sudo&quot;],&quot;urlbase&quot;:&quot;https:\/\/bugzilla.mozilla.org\/&quot;},&quot;constant&quot;:{&quot;CGI_URI_LIMIT&quot;:8000,&quot;COMMENT_COLS&quot;:80},&quot;param&quot;:{&quot;allow_attachment_display&quot;:true,&quot;maxattachmentsize&quot;:&quot;10240&quot;,&quot;maxusermatches&quot;:&quot;50&quot;,&quot;splinter_base&quot;:&quot;\/page.cgi?id=splinter.html&amp;ignore=\/&quot;,&quot;use_markdown&quot;:true},&quot;string&quot;:{&quot;TextEditor&quot;:{&quot;command_bold&quot;:&quot;Bold&quot;,&quot;command_bulleted_list&quot;:&quot;Bulleted list&quot;,&quot;command_code&quot;:&quot;Code&quot;,&quot;command_heading&quot;:&quot;Heading&quot;,&quot;command_italic&quot;:&quot;Italic&quot;,&quot;command_link&quot;:&quot;Link&quot;,&quot;command_numbered_list&quot;:&quot;Numbered list&quot;,&quot;command_quote&quot;:&quot;Quote&quot;,&quot;comment_editor&quot;:&quot;Comment Editor&quot;,&quot;edit&quot;:&quot;Edit&quot;,&quot;etiquette_link&quot;:{&quot;href&quot;:&quot;page.cgi?id=etiquette.html&quot;,&quot;text&quot;:&quot;Etiquette&quot;},&quot;guidelines_link&quot;:{&quot;href&quot;:&quot;page.cgi?id=bug-writing.html&quot;,&quot;text&quot;:&quot;Bug Writing Guidelines&quot;},&quot;loading&quot;:&quot;Loading…&quot;,&quot;markdown_link&quot;:{&quot;href&quot;:&quot;https:\/\/guides.github.com\/features\/mastering-markdown\/&quot;,&quot;text&quot;:&quot;Markdown supported&quot;},&quot;preview&quot;:&quot;Preview&quot;,&quot;preview_error&quot;:&quot;Preview could not be loaded. Please try again later.&quot;,&quot;text_editor&quot;:&quot;Text Editor&quot;,&quot;toolbar_label&quot;:&quot;Markdown text-formatting toolbar&quot;},&quot;bug&quot;:&quot;bug&quot;,&quot;bug_type_required&quot;:&quot;You must select a Type for this bug&quot;,&quot;component_required&quot;:&quot;You must select a Component for this bug&quot;,&quot;description_required&quot;:&quot;You must enter a Description for this bug&quot;,&quot;short_desc_required&quot;:&quot;You must enter a Summary for this bug&quot;,&quot;version_required&quot;:&quot;You must select a Version for this bug&quot;},&quot;user&quot;:{&quot;cookie_consent&quot;:&quot;&quot;,&quot;is_new&quot;:true,&quot;login&quot;:&quot;&quot;}}">
    <meta name="google-site-verification" content="JYXIuR9cAlV7fLmglSrc_4UaJS6Wzh5Mdxiorqu5AQc" />
    <title>208427 - &lt;input&gt;'s hidden DIV shows up as event.originalTarget in click events</title>

<link rel="Top" href="/">

  


  
    <link rel="Show" title="Dependency Tree"
          href="/showdependencytree.cgi?id=208427&amp;hide_resolved=1">
    <link rel="Show" title="Dependency Graph"
          href="/showdependencygraph.cgi?id=208427">
    <link rel="Show" title="Bug Activity"
          href="/show_activity.cgi?id=208427">

<link href="/static/v20260714.1/skins/standard/global.css" rel="stylesheet" type="text/css"><link href="/static/v20260714.1/extensions/BugModal/web/bug_modal.css" rel="stylesheet" type="text/css"><link href="/static/v20260714.1/js/jquery/plugins/contextMenu/contextMenu.css" rel="stylesheet" type="text/css"><link href="/static/v20260714.1/extensions/BMO/web/styles/bug_modal.css" rel="stylesheet" type="text/css"><link href="/static/v20260714.1/extensions/EditComments/web/styles/inline-comment-editor.css" rel="stylesheet" type="text/css"><link href="/static/v20260714.1/js/jquery/ui/jquery-ui-min.css" rel="stylesheet" type="text/css"><link href="/static/v20260714.1/js/jquery/ui/jquery-ui-structure-min.css" rel="stylesheet" type="text/css"><link href="/static/v20260714.1/js/jquery/ui/jquery-ui-theme-min.css" rel="stylesheet" type="text/css"><link href="/static/v20260714.1/skins/lib/prism.css" rel="stylesheet" type="text/css"><link href="/static/v20260714.1/skins/standard/consent.css" rel="stylesheet" type="text/css"><link href="/static/v20260714.1/extensions/Needinfo/web/styles/needinfo.css" rel="stylesheet" type="text/css"><link href="/static/v20260714.1/extensions/Review/web/styles/badge.css" rel="stylesheet" type="text/css"><link href="/static/v20260714.1/extensions/Review/web/styles/review.css" rel="stylesheet" type="text/css"><link href="/static/v20260714.1/skins/standard/text-editor.css" rel="stylesheet" type="text/css">



    
<script nonce="he6qSVFoCPoA6tmtr4ukHwvEHmd4KfMeKhpbT69SDStTp4nu" src="/static/v20260714.1/js/jquery/jquery-min.js"></script><script nonce="he6qSVFoCPoA6tmtr4ukHwvEHmd4KfMeKhpbT69SDStTp4nu" src="/static/v20260714.1/js/jquery/ui/jquery-ui-min.js"></script><script nonce="he6qSVFoCPoA6tmtr4ukHwvEHmd4KfMeKhpbT69SDStTp4nu" src="/static/v20260714.1/js/jquery/plugins/contextMenu/contextMenu-min.js"></script><script nonce="he6qSVFoCPoA6tmtr4ukHwvEHmd4KfMeKhpbT69SDStTp4nu" src="/static/v20260714.1/js/jquery/plugins/devbridgeAutocomplete/devbridgeAutocomplete-min.js"></script><script nonce="he6qSVFoCPoA6tmtr4ukHwvEHmd4KfMeKhpbT69SDStTp4nu" src="/static/v20260714.1/js/global.js"></script><script nonce="he6qSVFoCPoA6tmtr4ukHwvEHmd4KfMeKhpbT69SDStTp4nu" src="/static/v20260714.1/js/util.js"></script><script nonce="he6qSVFoCPoA6tmtr4ukHwvEHmd4KfMeKhpbT69SDStTp4nu" src="/static/v20260714.1/js/widgets.js"></script>

      <script nonce="he6qSVFoCPoA6tmtr4ukHwvEHmd4KfMeKhpbT69SDStTp4nu">BUGZILLA.value_descs = JSON.parse('{\"bug_status\":{},\"resolution\":{\"\":\"---\"}}');

  
    var tracking_flags_str = "{\"comments\":{\"cf_tracking_firefox153\":{\"?\":\"[Tracking Requested - why for this release]:\"},\"cf_tracking_firefox_relnote\":{\"?\":\"Release Note Request (optional, but appreciated)\\n[Why is this notable]:\\n[Affects Firefox for Android]:\\n[Suggested wording]:\\n[Links (documentation, blog post, etc)]:\"},\"cf_a11y_review_project_flag\":{\"requested\":\"Description:\\nPlease provide an explanation of the feature or change. Include a description of the user scenario in which it would be used and how the user would complete the task(s).\\nScreenshots and visual UI specs are welcome, but please include sufficient accompanying explanation so that blind members of the accessibility team are able to understand the feature\/change.\\n\\nHow do we test this?\\nIf there is an implementation to test, please provide instructions for testing it; e.g. setting preferences, other preparation, how to trigger the UI, etc.\\n\\nWhen will this ship?\\nTracking bug\/issue:\\nDesign documents (e.g. Product Requirements Document, UI spec):\\nEngineering lead:\\nProduct manager:\\n\\nThe accessibility team has developed the Mozilla Accessibility Release Guidelines which outline what is needed to make user interfaces accessible:\\nhttps:\/\/wiki.mozilla.org\/Accessibility\/Guidelines\\nPlease describe the accessibility guidelines you considered and what steps you\'ve taken to address them:\\n\\nDescribe any areas of concern to which you want the accessibility team to give special attention:\"},\"cf_tracking_firefox_esr115\":{\"?\":\"[Tracking Requested - why for this release]:\"},\"cf_tracking_firefox155\":{\"?\":\"[Tracking Requested - why for this release]:\"},\"cf_tracking_firefox_esr140\":{\"?\":\"[Tracking Requested - why for this release]:\"},\"cf_tracking_firefox_esr153\":{\"?\":\"[Tracking Requested - why for this release]:\"},\"cf_tracking_firefox154\":{\"?\":\"[Tracking Requested - why for this release]:\"}},\"types\":[\"tracking\"],\"flags\":{\"tracking\":{\"cf_status_thunderbird_esr153\":\"---\",\"cf_status_firefox153\":\"---\",\"cf_tracking_firefox_esr153\":\"---\",\"cf_status_firefox_esr115\":\"---\",\"cf_status_firefox154\":\"---\",\"cf_tracking_firefox_esr140\":\"---\",\"cf_status_firefox_esr140\":\"---\",\"cf_tracking_thunderbird_esr140\":\"---\",\"cf_status_firefox155\":\"---\",\"cf_tracking_firefox153\":\"---\",\"cf_tracking_firefox_relnote\":\"---\",\"cf_status_thunderbird_esr115\":\"---\",\"cf_tracking_thunderbird_esr153\":\"---\",\"cf_tracking_firefox154\":\"---\",\"cf_status_firefox_esr153\":\"---\",\"cf_status_thunderbird_esr140\":\"---\",\"cf_tracking_firefox_esr115\":\"---\",\"cf_status_firefox148\":\"fixed\",\"cf_tracking_thunderbird_esr115\":\"---\",\"cf_tracking_firefox155\":\"---\"},\"project\":{\"cf_webcompat_priority\":\"---\",\"cf_webcompat_score\":\"---\",\"cf_size_estimate\":\"---\",\"cf_accessibility_severity\":\"---\",\"cf_performance_impact\":\"---\",\"cf_a11y_review_project_flag\":\"---\"}}}";
    var TrackingFlags = $.parseJSON(tracking_flags_str);

  
    BUGZILLA.bug_id = 208427;
    BUGZILLA.bug_title = '208427 - \x3cinput\x3e\'s hidden DIV shows up as event.originalTarget in click events';
    BUGZILLA.bug_summary = '\x3cinput\x3e\'s hidden DIV shows up as event.originalTarget in click events';
    BUGZILLA.bug_url = 'https:\/\/bugzilla.mozilla.org\/show_bug.cgi?id=208427';
    BUGZILLA.bug_keywords = '',
    BUGZILLA.bug_secure = false;
    

  BUGZILLA.user = {
    id: 0,
    login: '',
    is_insider: false,
    is_timetracker: false,
    can_tag: false,
    can_triage: false,
    timezone: 'America\/Los_Angeles',
    settings: {
      quote_replies: 'quoted_reply',
      comment_box_position: 'after_comments',
      comment_sort_order: 'oldest_to_newest',
      zoom_textareas: true,
      remember_collapsed: true,
      inline_attachments: true,
      autosize_comments: false
    },
    cookie_consent: false
  };
  review_suggestions = {
    _mentors: [
    ],


      
      'DOM: Events': [
      ],

    
    _end: 1
  };

    static_component = 'DOM: Events';
      </script>
<script nonce="he6qSVFoCPoA6tmtr4ukHwvEHmd4KfMeKhpbT69SDStTp4nu" src="/static/v20260714.1/js/text-editor.js"></script><script nonce="he6qSVFoCPoA6tmtr4ukHwvEHmd4KfMeKhpbT69SDStTp4nu" src="/static/v20260714.1/extensions/BugModal/web/autosize.min.js"></script><script nonce="he6qSVFoCPoA6tmtr4ukHwvEHmd4KfMeKhpbT69SDStTp4nu" src="/static/v20260714.1/extensions/ProdCompSearch/web/js/prod_comp_search.js"></script><script nonce="he6qSVFoCPoA6tmtr4ukHwvEHmd4KfMeKhpbT69SDStTp4nu" src="/static/v20260714.1/extensions/BugModal/web/attachments_overlay.js"></script><script nonce="he6qSVFoCPoA6tmtr4ukHwvEHmd4KfMeKhpbT69SDStTp4nu" src="/static/v20260714.1/extensions/BugModal/web/bug_modal.js"></script><script nonce="he6qSVFoCPoA6tmtr4ukHwvEHmd4KfMeKhpbT69SDStTp4nu" src="/static/v20260714.1/extensions/BugModal/web/comments.js"></script><script nonce="he6qSVFoCPoA6tmtr4ukHwvEHmd4KfMeKhpbT69SDStTp4nu" src="/static/v20260714.1/extensions/ComponentWatching/web/js/overlay.js"></script><script nonce="he6qSVFoCPoA6tmtr4ukHwvEHmd4KfMeKhpbT69SDStTp4nu" src="/static/v20260714.1/js/bugzilla-readable-status-min.js"></script><script nonce="he6qSVFoCPoA6tmtr4ukHwvEHmd4KfMeKhpbT69SDStTp4nu" src="/static/v20260714.1/js/field.js"></script><script nonce="he6qSVFoCPoA6tmtr4ukHwvEHmd4KfMeKhpbT69SDStTp4nu" src="/static/v20260714.1/js/comments.js"></script><script nonce="he6qSVFoCPoA6tmtr4ukHwvEHmd4KfMeKhpbT69SDStTp4nu" src="/static/v20260714.1/extensions/TrackingFlags/web/js/flags.js"></script><script nonce="he6qSVFoCPoA6tmtr4ukHwvEHmd4KfMeKhpbT69SDStTp4nu" src="/static/v20260714.1/extensions/BMO/web/js/firefox-crash-table.js"></script><script nonce="he6qSVFoCPoA6tmtr4ukHwvEHmd4KfMeKhpbT69SDStTp4nu" src="/static/v20260714.1/extensions/MozChangeField/web/js/severity-s1-priority-p1.js"></script><script nonce="he6qSVFoCPoA6tmtr4ukHwvEHmd4KfMeKhpbT69SDStTp4nu" src="/static/v20260714.1/extensions/MozChangeField/web/js/clear-tracking-priority-s1.js"></script><script nonce="he6qSVFoCPoA6tmtr4ukHwvEHmd4KfMeKhpbT69SDStTp4nu" src="/static/v20260714.1/extensions/MozChangeField/web/js/set-tracking-severity-s1.js"></script><script nonce="he6qSVFoCPoA6tmtr4ukHwvEHmd4KfMeKhpbT69SDStTp4nu" src="/static/v20260714.1/js/lib/prism.js"></script><script nonce="he6qSVFoCPoA6tmtr4ukHwvEHmd4KfMeKhpbT69SDStTp4nu" src="/static/v20260714.1/js/consent.js"></script><script nonce="he6qSVFoCPoA6tmtr4ukHwvEHmd4KfMeKhpbT69SDStTp4nu" src="/static/v20260714.1/js/cookie-helper.js"></script><script nonce="he6qSVFoCPoA6tmtr4ukHwvEHmd4KfMeKhpbT69SDStTp4nu" src="/static/v20260714.1/js/lib/md5.min.js"></script><script nonce="he6qSVFoCPoA6tmtr4ukHwvEHmd4KfMeKhpbT69SDStTp4nu" src="/static/v20260714.1/extensions/Review/web/js/badge.js"></script><script nonce="he6qSVFoCPoA6tmtr4ukHwvEHmd4KfMeKhpbT69SDStTp4nu" src="/static/v20260714.1/extensions/Review/web/js/review.js"></script>

    

    
    <link href="/static/v20260714.1/skins/lib/fontawesome.min.css" rel="stylesheet" type="text/css">
    <link href="/static/v20260714.1/skins/lib/fontawesome-brands.min.css" rel="stylesheet" type="text/css">
    <link href="/static/v20260714.1/skins/lib/fontawesome-solid.min.css" rel="stylesheet" type="text/css">

    
    <link rel="search" type="application/opensearchdescription+xml"
                       title="Bugzilla@Mozilla" href="/search_plugin.cgi"><link rel="shortcut icon" href="/extensions/BMO/web/images/favicon.ico">
<link rel="icon" type="image/svg+xml" href="/extensions/BMO/web/images/favicon.svg">
<link rel="canonical" href="https://bugzilla.mozilla.org/show_bug.cgi?id=208427">
<link rel="shorturl" href="https://bugzilla.mozilla.org/208427"><meta name="robots" content="noarchive">
  </head>



  <body
        class="bugzilla-mozilla-org
               skin-standard bug_modal">



<div id="wrapper">

<header id="header" role="banner" aria-label="Global Header">
  <div class="inner" role="none">
    <button type="button" class="iconic ghost" id="open-menu-drawer" aria-label="Open Site Menu">
      <span class="icon" aria-hidden="true" data-icon="menu"></span>
    </button><div id="header-external-links" class="dropdown" role="none">
  <button type="button" id="header-external-menu-button" class="dropdown-button minor"
          aria-label="Show Mozilla Menu" aria-expanded="false" aria-haspopup="true"
          aria-controls="header-external-menu">
    <img src="/static/v20260714.1/extensions/BMO/web/images/moz-fav-one-color-white-rgb.svg"
         width="32" height="32" alt="">
  </button>
  <ul class="dropdown-content right" id="header-external-menu" role="menu" aria-label="Mozilla Menu"
      style="display:none;">
    <li role="none">
      <a href="https://www.mozilla.org/" role="menuitem">
        <span class="label" role="none">Mozilla Home</span>
      </a>
    </li>
    <li role="separator"></li>
    <li role="none">
      <a href="https://www.mozilla.org/privacy/websites/" role="menuitem">
        <span class="label" role="none">Privacy</span>
      </a>
    </li>
    <li role="none">
      <a href="https://www.mozilla.org/privacy/websites/#cookies" role="menuitem">
        <span class="label" role="none">Cookies</span>
      </a>
    </li>
    <li role="none">
      <a href="https://www.mozilla.org/about/legal/" role="menuitem">
        <span class="label" role="none">Legal</span>
      </a>
    </li>
  </ul>
</div>
    <h1 id="header-title" class="title" role="none">
      <a class="header-button" href="https://bugzilla.mozilla.org/home" title="Go to home page">
        <span aria-label="Go to Bugzilla Home Page">Bugzilla</span>
      </a>
    </h1>
    <form id="header-search" class="quicksearch" action="/buglist.cgi"
          data-no-csrf role="search" aria-label="Search Bugs">
      <button type="button" class="iconic ghost" id="show-searchbox"
              aria-label="Search Bugs">
        <span class="icon" aria-hidden="true" data-icon="search"></span>
      </button>
      <div class="searchbox-outer dropdown" role="combobox" aria-label="Quick Search"
           aria-haspopup="listbox" aria-owns="header-search-dropdown" aria-expanded="false">
        <span class="icon" aria-hidden="true" data-icon="search"></span>
        <input id="quicksearch_top" class="dropdown-button" name="quicksearch" autocomplete="off"
               value="" accesskey="s"
               placeholder="Search Bugs"
               title="Enter a bug number or some search terms"
               role="searchbox" aria-controls="header-search-dropdown" aria-label="Search Terms"><div id="header-search-dropdown" class="dropdown-content dropdown-panel right" role="listbox"
     style="display: none;">
  <div id="header-search-dropdown-wrapper" role="none">
    <section id="header-search-dropdown-help" role="group" aria-label="Help">
      <footer role="none">
        <a href="/page.cgi?id=quicksearch.html">Quick Search Tips</a>
        <a href="/query.cgi?format=advanced">Advanced Search</a>
      </footer>
    </section>
  </div>
</div>
      </div>
    </form>
    <nav id="header-nav" role="menubar" aria-label="Site Links">
      <ul class="links" role="none"><li role="none">
    <a class="header-button" href="/describecomponents.cgi"
       title="Browse bugs by component" role="menuitem">
      <span class="icon" aria-hidden="true" data-icon="category"></span>
      <span class="label" role="none">Browse</span>
    </a>
  </li>
  <li role="none">
    <a class="header-button" href="/query.cgi?format=advanced"
       title="Search bugs using various criteria" role="menuitem">
      <span class="icon" aria-hidden="true" data-icon="pageview"></span>
      <span class="label" role="none">Advanced Search</span>
    </a>
  </li>
  <li role="none">
    <a class="header-button" href="/enter_bug.cgi"
       title="File a new bug" role="menuitem">
      <span class="icon" aria-hidden="true" data-icon="add_box"></span>
      <span class="label" role="none">New Bug</span>
    </a>
  </li>
      </ul>
      <div class="dropdown" role="none">
        <button type="button" id="header-tools-menu-button"
                class="header-button dropdown-button minor" title="More tools…"
                role="menuitem" aria-label="Show More Tools Menu" aria-expanded="false"
                aria-haspopup="true" aria-controls="header-tools-menu">
          <span class="icon" aria-hidden="true" data-icon="more_horiz"></span>
        </button>
        <ul class="dropdown-content left" id="header-tools-menu" role="menu"
            aria-label="More Tools Menu" style="display:none;"><li role="none">
    <a href="/report.cgi" role="menuitem">
      <span class="icon" aria-hidden="true" data-icon="analytics"></span>
      <span class="label" role="none">Reports</span>
    </a>
  </li>
    <li role="separator"></li>
    <li role="none">
      <a href="https://bmo.readthedocs.io/en/latest/" target="_blank" role="menuitem">
        <span class="icon" aria-hidden="true" data-icon="help"></span>
        <span class="label" role="none">Documentation</span>
      </a>
    </li>
        </ul>
      </div>
    </nav>
      <ul id="header-login" class="links" role="none"><li id="mini_login_container_top" role="none">
  <a id="login_link_top" href="/index.cgi?GoAheadAndLogIn=1"
     class='show_mini_login_form header-button' data-qs-suffix="_top"
     role="button">
    <span class="icon" aria-hidden="true" data-icon="login"></span>
    <span class="label" role="none">Log In</span>
  </a>

  <div id="mini_login_top" class="mini-popup mini_login bz_default_hidden">

<form method="post" action="/github.cgi">
    <input type="hidden" name="github_token" value="MV234O1wn7utHIAAwE4gI2X1S63fgQxymLN9G9Dp7oQxQrh67ZpR2SgJcHomVzYNHFeLdO8KZR0Ynp8y8pPnMfMwt2xkKVvmRszEO20LujGE46Moq5RlGVATZGQVjQIxnNyZEdm9X7caRPu6suUfn94GtkYLJVbPyIZsfk4pCtB5xwhC9kNnKw41uFpooZXrFHDCTfuaXBotLQJVimeJRYj1f9XuhRQRjjVMeMipsfIW9s27glVCHu4nHuAx0yyv">
    <input type="hidden" name="target_uri" value="https://bugzilla.mozilla.org/show_bug.cgi">
    <button type="submit">
      <i class="fab fa-github"></i> Log In with GitHub
    </button>
  </form>

    <div class="method-separator">or</div>

  <form action="/show_bug.cgi?id=208427" method="POST"
        data-qs-suffix="_top">

    <input id="Bugzilla_login_top"
           class="bz_login"
           name="Bugzilla_login"
           title="Login"
           placeholder="Email"
           aria-label="Email"
           type="email"
           required
    >
    <input class="bz_password"
           id="Bugzilla_password_top"
           name="Bugzilla_password"
           type="password"
           title="Password"
           placeholder="Password"
           aria-label="Password"
           required
    >
    <input class="bz_password bz_default_hidden bz_mini_login_help" type="text"
           id="Bugzilla_password_dummy_top" value="password"
           title="Password"
    >
      <span class="remember-outer">
        <input type="checkbox" id="Bugzilla_remember_top"
               name="Bugzilla_remember" value="on" class="bz_remember"
               checked>
        <label for="Bugzilla_remember_top">Remember me</label>
      </span>
    <input type="hidden" name="Bugzilla_login_token"
           value="1784473094-qu2fQ2VFpqcAn7bLqZJngxW-cMiOcoPIy-4qrP3QzeQ">
    <input type="submit" name="GoAheadAndLogIn" value="Log In" id="log_in_top"
           class="check_mini_login_fields" data-qs-suffix="_top">
    <a href="#" id="hide_mini_login_top" aria-label="Close"
       class="close-button hide_mini_login_form" data-qs-suffix="_top">
      <span class="icon" aria-hidden="true"></span>
    </a>
  </form>
  <div class="footer">
      <a href="/createaccount.cgi">Create an Account</a>
    &middot;
    <a id="forgot_link_top" href="/index.cgi?GoAheadAndLogIn=1#forgot"
       class='show_forgot_form'
       data-qs-suffix="_top">Forgot Password</a>
  </div>
  </div>

  <div id="forgot_form_top" class="mini-popup mini_forgot bz_default_hidden">
  <form action="/token.cgi" method="post">
    <input type="email" name="loginname" size="20" placeholder="Email" aria-label="Email" required>
    <input id="forgot_button_top" value="Reset Password"
           type="submit">
    <input type="hidden" name="a" value="reqpw">
    <input type="hidden" id="token_top" name="token" value="1784473094-EBW9XViZKIoLAUycVtFRFUHme49H6ePcUZTY6MsmqJA">
    <a href="#" class="close-button hide_forgot_form" aria-label="Close" data-qs-suffix="_top">
      <span class="icon" aria-hidden="true"></span>
    </a>
  </form>
  </div>
</li>
      </ul>
  </div>
  <dialog id="menu-drawer" inert aria-label="Site Menu">
    <div class="drawer-inner" role="none">
      <div class="header" role="none">
        <button type="button" class="iconic ghost" id="close-menu-drawer"
                aria-label="Close Site Menu">
          <span class="icon" aria-hidden="true" data-icon="close"></span>
        </button>
      </div>
      <ul role="menu" aria-label="Site Links"><li role="none">
    <a class="header-button" href="/describecomponents.cgi"
       title="Browse bugs by component" role="menuitem">
      <span class="icon" aria-hidden="true" data-icon="category"></span>
      <span class="label" role="none">Browse</span>
    </a>
  </li>
  <li role="none">
    <a class="header-button" href="/query.cgi?format=advanced"
       title="Search bugs using various criteria" role="menuitem">
      <span class="icon" aria-hidden="true" data-icon="pageview"></span>
      <span class="label" role="none">Advanced Search</span>
    </a>
  </li>
  <li role="none">
    <a class="header-button" href="/enter_bug.cgi"
       title="File a new bug" role="menuitem">
      <span class="icon" aria-hidden="true" data-icon="add_box"></span>
      <span class="label" role="none">New Bug</span>
    </a>
  </li><li role="none">
    <a href="/report.cgi" role="menuitem">
      <span class="icon" aria-hidden="true" data-icon="analytics"></span>
      <span class="label" role="none">Reports</span>
    </a>
  </li>
    <li role="separator"></li>
    <li role="none">
      <a href="https://bmo.readthedocs.io/en/latest/" target="_blank" role="menuitem">
        <span class="icon" aria-hidden="true" data-icon="help"></span>
        <span class="label" role="none">Documentation</span>
      </a>
    </li>
      </ul>
    </div>
  </dialog>
</header> 


<main id="bugzilla-body" tabindex="-1">

<aside id="message-container" role="complementary">
  <noscript>
    <div class="noscript">
      <div class="inner">
        <p>Please enable JavaScript in your browser to use all the features on this site.</p>
      </div>
    </div>
  </noscript>
  
</aside>

<div id="main-inner">




<div role="toolbar" id="page-toolbar">
  <div role="group" class="buttons">
    <button type="button" id="copy-summary" class="secondary separate-dropdown-button-main"
      title="Copy bug number and summary to your clipboard">Copy Summary</button
    ><div id="copy-menu-dropdown" class="dropdown"><button type="button" id="copy-menu-btn" aria-haspopup="true" aria-label="View"
      aria-expanded="false" aria-controls="copy-menu" class="dropdown-button secondary separate-dropdown-button-arrow"
      title="More options for copy">&#9662;</button>
      <ul class="dropdown-content left" id="copy-menu" role="menu" style="display:none;">
        <li role="presentation">
          <a id="copy-markdown-summary" role="menuitem" tabindex="-1">Markdown</a>
        </li>
        <li role="presentation">
          <a id="copy-markdown-bug-number" role="menuitem" tabindex="-1">Markdown (bug number)</a>
        </li>
        <li role="presentation">
          <a id="copy-text-summary" role="menuitem" tabindex="-1">Plain Text</a>
        </li>
        <li role="presentation">
          <a id="copy-html-summary" role="menuitem" tabindex="-1">HTML</a>
        </li>
      </ul>
    </div>
    <div class="dropdown">
      <button type="button" id="action-menu-btn" aria-haspopup="true" aria-label="View"
        aria-expanded="false" aria-controls="action-menu" class="dropdown-button secondary">View &#9662;</button>
      <ul class="dropdown-content left" id="action-menu" role="menu" style="display:none;">
        <li role="presentation">
          <a id="action-reset" role="menuitem" tabindex="-1">Reset Sections</a>
        </li>
        <li role="presentation">
          <a id="action-expand-all" role="menuitem" tabindex="-1">Expand All Sections</a>
        </li>
        <li role="presentation">
          <a id="action-collapse-all" role="menuitem" tabindex="-1">Collapse All Sections</a>
        </li>
        <li role="separator"></li>
        <li role="presentation">
          <a id="action-history" role="menuitem" tabindex="-1">History</a>
        </li>
        <li role="separator"></li>
        <li role="presentation">
          <a href="/rest/bug/208427" role="menuitem" tabindex="-1">JSON</a>
        </li>
        <li role="presentation">
          <a href="/show_bug.cgi?ctype=xml&amp;id=208427" role="menuitem" tabindex="-1">XML</a>
        </li>
      </ul>
    </div>
  </div>
</div>



<div role="status" id="io-error" style="display:none"></div>
<section class="module"
>
  <div class="module-content"
  >
  <div id="summary-container">
    <div class="field bug_modal indent"
    id="field-status_summary"
>



  
    <div class=" container">
        <span id="field-value-status_summary">
      <span class="bug-status-label text" data-status="closed">Closed</span>
      <span id="field-value-bug_id">
        <a href="/show_bug.cgi?id=208427">Bug 208427</a>
      </span>
      <span class="bug-time-labels">
        <span class="bug-time-label">Opened <span class="rel-time" title="2003-06-05 09:29 PDT" data-time="1054830557">23 years ago</span></span>
          <span class="bug-time-label">Closed <span class="rel-time" title="2026-01-10 13:56 PST" data-time="1768082160">6 months ago</span></span>
      </span>
        </span>
    </div>

  
</div>
<div class="field bug_modal indent edit-hide"
>



  
    <div class=" container">
      

      <h1 id="field-value-short_desc">&lt;input&gt;'s hidden DIV shows up as event<wbr>.original<wbr>Target in click events</h1>
    </div>

  
</div>

    <div class="field bug_modal edit-show"
    id="field-short_desc" style="display:none"
>
    <div class="name">
      
        <span class="required_star edit-show" style="display:none" aria-label="Required Field">*</span> 
        <a href="https://wiki.mozilla.org/BMO/UserGuide/BugFields#short_desc" id="short_desc-help-link" class="help">Summary:
        </a>
    </div>



  
    <div class="value">
        <span id="field-value-short_desc">
            &lt;input&gt;'s hidden DIV shows up as event.originalTarget in click events

        </span>
    </div>

  
</div>
  </div>
  </div>
</section>


<section class="module" id="module-categories"
>
    <header id="module-categories-header" class="module-header">
      <div class="module-latch"
           data-label-expanded="Collapse Categories section"
           data-label-collapsed="Expand Categories section">
        <div class="module-spinner" role="button" tabindex="0"
             aria-controls="module-categories-content"
             aria-expanded="true"
             aria-labeledby="module-categories-title"
             aria-describedby="module-categories-subtitle"></div>
        <h2 class="module-title" id="module-categories-title">Categories</h2>
          <h3 class="module-subtitle" id="module-categories-subtitle">
            (Core :: DOM: Events, defect, P5)
          </h3>
      </div>
    </header>
  <div class="module-content" id="module-categories-content"
  ><div class="fields-lhs">

    <div class="field bug_modal"
    id="field-product"
>
    <div class="name">
      
        <a href="/describecomponents.cgi?product=Core" id="product-help-link" class="help">Product:
        </a>
    </div>



  
    <div class="value">
        <span id="field-value-product">
      <div class="name-info-outer dropdown">
        <span id="product-name" class="dropdown-button" tabindex="0" role="button"
             aria-haspopup="menu" aria-controls="product-info">Core
          <span class="icon" aria-hidden="true">&#x25BE;</span>
        </span>
        <aside id="product-info" class="name-info-popup dropdown-content right hover-display" hidden role="menu"
               aria-label="Product description and actions">
          <header>
            <div class="title">Core</div>
            <div class="description">Shared components used by Firefox and other Mozilla software, including handling of Web content; Gecko, HTML, CSS, layout, DOM, scripts, images, networking, etc. Issues with web page layout probably go here, while Firefox user interface issues belong in the <a href="https://bugzilla.mozilla.org/describecomponents.cgi?product=Firefox">Firefox</a> product. (<a href="https://wiki.mozilla.org/Modules/All#Core">More info</a>)</div>
          </header>
          <li role="separator"></li>
          <div class="actions">
            <div><a href="/buglist.cgi?product=Core&amp;bug_status=__open__"
                    target="_blank" role="menuitem" tabindex="-1">See Open Bugs in This Product</a></div>
            <div><a href="/enter_bug.cgi?product=Core"
                    target="_blank" role="menuitem" tabindex="-1">File New Bug in This Product</a></div>
            <div><button disabled type="button" class="secondary component-watching" role="menuitem" tabindex="-1"
                         data-product="Core"
                         data-label-watch="Watch This Product" data-label-unwatch="Unwatch This Product"
                         data-source="BugModal">Watch This Product</button></div>
          </div>
        </aside>
      </div>
        </span>
    </div>

  
</div>

    <div class="field bug_modal"
    id="field-component"
>
    <div class="name">
      
        <a href="/describecomponents.cgi?product=Core&component=DOM%3A%20Events#DOM%3A%20Events" id="component-help-link" class="help">Component:
        </a>
    </div>



  
    <div class="value">
        <span id="field-value-component">
      <div class="name-info-outer dropdown">
        <span id="component-name" class="dropdown-button" tabindex="0" role="button"
             aria-haspopup="menu" aria-controls="component-info">DOM: Events
          <span class="icon" aria-hidden="true">&#x25BE;</span>
        </span>
        <aside id="component-info" class="name-info-popup dropdown-content right hover-display" hidden role="menu"
               aria-label="Component description and actions">
          <header>
            <div class="title">Core :: DOM: Events</div>
            <div class="description">This component includes bugs for DOM events from <a href="https://dom.spec.whatwg.org/">https://dom.spec.whatwg.org</a>.</div>
          </header>
          <li role="separator"></li>
          <div class="actions">
            <div><a href="/buglist.cgi?product=Core&amp;component=DOM%3A%20Events&amp;bug_status=__open__"
                    target="_blank" role="menuitem" tabindex="-1">See Open Bugs in This Component</a></div>
            <div><a href="/buglist.cgi?product=Core&amp;component=DOM%3A%20Events&amp;chfield=resolution&chfieldfrom=-6m&chfieldvalue=FIXED&bug_status=__closed__"
                    target="_blank" role="menuitem" tabindex="-1">Recently Fixed Bugs in This Component</a></div>
            <div><a href="/enter_bug.cgi?product=Core&amp;component=DOM%3A%20Events"
                    target="_blank" role="menuitem" tabindex="-1">File New Bug in This Component</a></div>
            <div><button disabled type="button" class="secondary component-watching" role="menuitem" tabindex="-1"
                         data-product="Core" data-component="DOM: Events"
                         data-label-watch="Watch This Component" data-label-unwatch="Unwatch This Component"
                         data-source="BugModal">Watch This Component</button></div>
          </div>
        </aside>
      </div>
        </span>
    </div>

  
</div>

    <div class="field bug_modal edit-show"
    id="field-version" style="display:none"
>
    <div class="name">
      
        <a href="https://wiki.mozilla.org/BMO/UserGuide/BugFields#version" id="version-help-link" class="help">Version:
        </a>
    </div>



  
    <div class="value">
        <span id="field-value-version">
            Trunk

        </span>
    </div>

  
</div>

    <div class="field bug_modal"
>
    <div class="name">
      
        <a href="https://wiki.mozilla.org/BMO/UserGuide/BugFields#rep_platform" id="-help-link" class="help">Platform:
        </a>
    </div>



  
    <div class=" container"><div class="field bug_modal inline"
    id="field-rep_platform"
>



  
    <div class="value">
        <span id="field-value-rep_platform">
            x86

        </span>
    </div>

  
</div><div class="field bug_modal indent inline"
    id="field-op_sys"
>



  
    <div class="value">
        <span id="field-value-op_sys">
            Windows 2000

        </span>
    </div>

  
</div><div class="field bug_modal"
>



  
    <div class=" container">
    </div>

  
</div>
    </div>

  
</div>
</div><div class="fields-rhs">

    <div class="field bug_modal contains-buttons"
    id="field-bug_type"
>
    <div class="name">
      
        <a href="https://wiki.mozilla.org/BMO/UserGuide/BugFields#bug_type" id="bug_type-help-link" class="help">Type:
        </a>
    </div>



  
    <div class="value">
        <span id="field-value-bug_type">
      <span class="bug-type-label iconic-text" data-type="defect">
        <span class="icon" aria-hidden="true"></span>defect</span>
        </span>
    </div>

  
</div>

    <div class="field bug_modal"
    id="field-importance"
>



  
    <div class=" container">
        <span id="field-value-importance"><div class="field bug_modal inline"
    id="field-priority"
>
    <div class="name">
      
        <a href="https://wiki.mozilla.org/BMO/UserGuide/BugFields#priority" id="priority-help-link" class="help">Priority:
        </a>
    </div>



  
    <div class="value">
        <span id="field-value-priority">P5
        </span>
    </div>

  
</div><div class="field bug_modal inline"
    id="field-bug_severity"
>
    <div class="name">
      
        <a href="https://wiki.mozilla.org/BMO/UserGuide/BugFields#bug_severity" id="bug_severity-help-link" class="help">Severity:
        </a>
    </div>



  
    <div class="value">
        <span id="field-value-bug_severity">
            S3

        </span>
    </div>

  
</div>
        </span>
    </div>

  
</div>


    <div class="field bug_modal edit-show"
    id="field-cf_fx_points" style="display:none"
>
    <div class="name">
      Points:
    </div>



  
    <div class="value">
        <span id="field-value-cf_fx_points">
            ---

        </span>
    </div>

  
</div>
</div>
  </div>
</section>


<section class="module" id="module-tracking"
>
    <header id="module-tracking-header" class="module-header">
      <div class="module-latch"
           data-label-expanded="Collapse Tracking section"
           data-label-collapsed="Expand Tracking section">
        <div class="module-spinner" role="button" tabindex="0"
             aria-controls="module-tracking-content"
             aria-expanded="true"
             aria-labeledby="module-tracking-title"
             aria-describedby="module-tracking-subtitle"></div>
        <h2 class="module-title" id="module-tracking-title">Tracking</h2>
          <h3 class="module-subtitle" id="module-tracking-subtitle">
            (<span id="readable-bug-status" data-readable-bug-status="{&quot;status&quot;:&quot;RESOLVED&quot;,&quot;cf_tracking_firefox_esr115&quot;:&quot;---&quot;,&quot;cf_tracking_thunderbird_esr115&quot;:&quot;---&quot;,&quot;flags&quot;:[],&quot;cf_tracking_firefox155&quot;:&quot;---&quot;,&quot;cf_status_firefox_esr153&quot;:&quot;---&quot;,&quot;cf_status_thunderbird_esr140&quot;:&quot;---&quot;,&quot;dupe_of&quot;:null,&quot;resolution&quot;:&quot;FIXED&quot;,&quot;cf_a11y_review_project_flag&quot;:&quot;---&quot;,&quot;cf_tracking_firefox153&quot;:&quot;---&quot;,&quot;cf_status_thunderbird_esr115&quot;:&quot;---&quot;,&quot;cf_status_firefox155&quot;:&quot;---&quot;,&quot;cf_performance_impact&quot;:&quot;---&quot;,&quot;cf_accessibility_severity&quot;:&quot;---&quot;,&quot;cf_webcompat_score&quot;:&quot;---&quot;,&quot;cf_status_firefox153&quot;:&quot;---&quot;,&quot;cf_tracking_firefox_esr153&quot;:&quot;---&quot;,&quot;cf_webcompat_priority&quot;:&quot;---&quot;,&quot;cf_status_firefox148&quot;:&quot;fixed&quot;,&quot;id&quot;:208427,&quot;keywords&quot;:[],&quot;priority&quot;:&quot;P5&quot;,&quot;cf_tracking_thunderbird_esr153&quot;:&quot;---&quot;,&quot;cf_tracking_firefox154&quot;:&quot;---&quot;,&quot;cf_tracking_firefox_relnote&quot;:&quot;---&quot;,&quot;cf_tracking_thunderbird_esr140&quot;:&quot;---&quot;,&quot;cf_tracking_firefox_esr140&quot;:&quot;---&quot;,&quot;cf_status_firefox154&quot;:&quot;---&quot;,&quot;cf_status_firefox_esr140&quot;:&quot;---&quot;,&quot;cf_status_thunderbird_esr153&quot;:&quot;---&quot;,&quot;cf_size_estimate&quot;:&quot;---&quot;,&quot;cf_status_firefox_esr115&quot;:&quot;---&quot;,&quot;target_milestone&quot;:&quot;148 Branch&quot;}"></span>)
          </h3>
      </div>
    </header>
  <div class="module-content" id="module-tracking-content"
  ><div class="fields-lhs">

    <div class="field bug_modal edit-hide"
    id="field-status-view"
>
    <div class="name">
      
        <a href="https://wiki.mozilla.org/BMO/UserGuide/BugStatuses" id="status-view-help-link" class="help">Status:
        </a>
    </div>



  
    <div class=" container">
        <span id="field-value-status-view">RESOLVED
        FIXED
        </span>
    </div>

  
</div>

    <div class="field bug_modal edit-show"
    id="field-status-edit" style="display:none"
>
    <div class="name">
      
        <a href="https://wiki.mozilla.org/BMO/UserGuide/BugStatuses" id="status-edit-help-link" class="help">Status:
        </a>
    </div>



  
    <div class=" container">
        <span id="field-value-status-edit"><div class="field bug_modal inline"
    id="field-bug_status"
>



  
    <div class="value">
        <span id="field-value-bug_status">
            RESOLVED

        </span>
    </div>

  
</div><div class="field bug_modal indent inline"
    id="field-resolution"
>



  
    <div class="value">
        <span id="field-value-resolution">
            FIXED

        </span>
    </div>

  
</div>
  <div id="status-action-buttons">
      <div id="assigned-container" style="display:none">
        <button type="button" class="secondary" id="mark-as-assigned-btn">
          Mark as Assigned
        </button>
      </div>
  </div>
        </span>
    </div>

  
</div>

    <div class="field bug_modal"
    id="field-target_milestone"
>
    <div class="name">
      
        <a href="https://wiki.mozilla.org/BMO/UserGuide/BugFields#target_milestone" id="target_milestone-help-link" class="help">Milestone:
        </a>
    </div>



  
    <div class="value">
        <span id="field-value-target_milestone">
            148 Branch

        </span>
    </div>

  
</div>

    <div class="field bug_modal edit-show"
    id="field-cf_fx_iteration" style="display:none"
>
    <div class="name">
      Iteration:
    </div>



  
    <div class="value">
        <span id="field-value-cf_fx_iteration">
            ---

        </span>
    </div>

  
</div>


      <div class="field bug_modal edit-show" style="display:none"
>
    <div class="name">
      
        <a href="https://wiki.mozilla.org/BMO/UserGuide#Project_Flags" id="-help-link" class="help">Project Flags:
        </a>
    </div>



  
    <div class=" container"><div class="flags edit-show" style="display:none">
  <table class="layout-table tracking-flags">
      <tr>
        <td class="tracking-flag-name">a11y-review</td>
        <td class="tracking-flag-status"><input type="hidden" id="cf_a11y_review_project_flag-dirty">
  <select id="cf_a11y_review_project_flag" name="cf_a11y_review_project_flag">
        <option value="---"
          id="v4876_cf_a11y_review_project_flag" selected
        >---
        </option>
  </select></td>
      </tr>
      <tr>
        <td class="tracking-flag-name">Accessibility Severity</td>
        <td class="tracking-flag-status"><input type="hidden" id="cf_accessibility_severity-dirty">
  <select id="cf_accessibility_severity" name="cf_accessibility_severity">
        <option value="---"
          id="v6045_cf_accessibility_severity" selected
        >---
        </option>
  </select></td>
      </tr>
      <tr>
        <td class="tracking-flag-name">Performance Impact</td>
        <td class="tracking-flag-status"><input type="hidden" id="cf_performance_impact-dirty">
  <select id="cf_performance_impact" name="cf_performance_impact">
        <option value="---"
          id="v5427_cf_performance_impact" selected
        >---
        </option>
  </select></td>
      </tr>
      <tr>
        <td class="tracking-flag-name">Size Estimate</td>
        <td class="tracking-flag-status"><input type="hidden" id="cf_size_estimate-dirty">
  <select id="cf_size_estimate" name="cf_size_estimate">
        <option value="---"
          id="v7004_cf_size_estimate" selected
        >---
        </option>
  </select></td>
      </tr>
      <tr>
        <td class="tracking-flag-name">Webcompat Priority</td>
        <td class="tracking-flag-status"><input type="hidden" id="cf_webcompat_priority-dirty">
  <select id="cf_webcompat_priority" name="cf_webcompat_priority">
        <option value="---"
          id="v4274_cf_webcompat_priority" selected
        >---
        </option>
  </select></td>
      </tr>
      <tr>
        <td class="tracking-flag-name">Webcompat Score</td>
        <td class="tracking-flag-status"><input type="hidden" id="cf_webcompat_score-dirty">
  <select id="cf_webcompat_score" name="cf_webcompat_score">
        <option value="---"
          id="v6757_cf_webcompat_score" selected
        >---
        </option>
  </select></td>
      </tr>
  </table>
</div>
    </div>

  
</div>
</div><div class="fields-rhs">

      <div class="field tracking-flags-wrapper"
>
    <div class="name">
      
        <a href="https://wiki.mozilla.org/BMO/UserGuide#Tracking_Flags" id="-help-link" class="help">Tracking Flags:
        </a>
    </div>



  
    <div class=" container"><div class="flags edit-hide">
    <table class="layout-table tracking-flags">
        <tr>
          <th></th>
          <th>Tracking</th>
          <th>Status</th>
        </tr>
        <tr>
          <td class="tracking-flag-name">firefox148</td>
            <td class="tracking-flag-tracking">---
            </td>
          <td class="tracking-flag-status">
              <a href="/buglist.cgi?f1=cf_status_firefox148&amp;o1=equals&amp;v1=fixed">fixed</a>
          </td>
        </tr>
    </table>
  </div>


<div class="flags edit-show" style="display:none">
  <table class="layout-table tracking-flags">
      <tr>
        <th></th>
        <th>Tracking</th>
        <th>Status</th>
      </tr>
      <tr>
        <td class="tracking-flag-name">relnote-firefox</td>
          <td class="tracking-flag-tracking"></td>
        <td class="tracking-flag-status"><input type="hidden" id="cf_tracking_firefox_relnote-dirty">
  <select id="cf_tracking_firefox_relnote" name="cf_tracking_firefox_relnote">
        <option value="---"
          id="v539_cf_tracking_firefox_relnote" selected
        >---
        </option>
  </select></td>
      </tr>
      <tr>
        <td class="tracking-flag-name">thunderbird_esr115</td>
          <td class="tracking-flag-tracking"><input type="hidden" id="cf_tracking_thunderbird_esr115-dirty">
  <select id="cf_tracking_thunderbird_esr115" name="cf_tracking_thunderbird_esr115">
        <option value="---"
          id="v6094_cf_tracking_thunderbird_esr115" selected
        >---
        </option>
  </select></td>
        <td class="tracking-flag-status"><input type="hidden" id="cf_status_thunderbird_esr115-dirty">
  <select id="cf_status_thunderbird_esr115" name="cf_status_thunderbird_esr115">
        <option value="---"
          id="v6100_cf_status_thunderbird_esr115" selected
        >---
        </option>
  </select></td>
      </tr>
      <tr>
        <td class="tracking-flag-name">thunderbird_esr140</td>
          <td class="tracking-flag-tracking"><input type="hidden" id="cf_tracking_thunderbird_esr140-dirty">
  <select id="cf_tracking_thunderbird_esr140" name="cf_tracking_thunderbird_esr140">
        <option value="---"
          id="v7067_cf_tracking_thunderbird_esr140" selected
        >---
        </option>
  </select></td>
        <td class="tracking-flag-status"><input type="hidden" id="cf_status_thunderbird_esr140-dirty">
  <select id="cf_status_thunderbird_esr140" name="cf_status_thunderbird_esr140">
        <option value="---"
          id="v7098_cf_status_thunderbird_esr140" selected
        >---
        </option>
  </select></td>
      </tr>
      <tr>
        <td class="tracking-flag-name">thunderbird_esr153</td>
          <td class="tracking-flag-tracking"><input type="hidden" id="cf_tracking_thunderbird_esr153-dirty">
  <select id="cf_tracking_thunderbird_esr153" name="cf_tracking_thunderbird_esr153">
        <option value="---"
          id="v7594_cf_tracking_thunderbird_esr153" selected
        >---
        </option>
  </select></td>
        <td class="tracking-flag-status"><input type="hidden" id="cf_status_thunderbird_esr153-dirty">
  <select id="cf_status_thunderbird_esr153" name="cf_status_thunderbird_esr153">
        <option value="---"
          id="v7613_cf_status_thunderbird_esr153" selected
        >---
        </option>
  </select></td>
      </tr>
      <tr>
        <td class="tracking-flag-name">firefox-esr115</td>
          <td class="tracking-flag-tracking"><input type="hidden" id="cf_tracking_firefox_esr115-dirty">
  <select id="cf_tracking_firefox_esr115" name="cf_tracking_firefox_esr115">
        <option value="---"
          id="v6079_cf_tracking_firefox_esr115" selected
        >---
        </option>
  </select></td>
        <td class="tracking-flag-status"><input type="hidden" id="cf_status_firefox_esr115-dirty">
  <select id="cf_status_firefox_esr115" name="cf_status_firefox_esr115">
        <option value="---"
          id="v6084_cf_status_firefox_esr115" selected
        >---
        </option>
  </select></td>
      </tr>
      <tr>
        <td class="tracking-flag-name">firefox-esr140</td>
          <td class="tracking-flag-tracking"><input type="hidden" id="cf_tracking_firefox_esr140-dirty">
  <select id="cf_tracking_firefox_esr140" name="cf_tracking_firefox_esr140">
        <option value="---"
          id="v7040_cf_tracking_firefox_esr140" selected
        >---
        </option>
  </select></td>
        <td class="tracking-flag-status"><input type="hidden" id="cf_status_firefox_esr140-dirty">
  <select id="cf_status_firefox_esr140" name="cf_status_firefox_esr140">
        <option value="---"
          id="v7057_cf_status_firefox_esr140" selected
        >---
        </option>
  </select></td>
      </tr>
      <tr>
        <td class="tracking-flag-name">firefox-esr153</td>
          <td class="tracking-flag-tracking"><input type="hidden" id="cf_tracking_firefox_esr153-dirty">
  <select id="cf_tracking_firefox_esr153" name="cf_tracking_firefox_esr153">
        <option value="---"
          id="v7578_cf_tracking_firefox_esr153" selected
        >---
        </option>
  </select></td>
        <td class="tracking-flag-status"><input type="hidden" id="cf_status_firefox_esr153-dirty">
  <select id="cf_status_firefox_esr153" name="cf_status_firefox_esr153">
        <option value="---"
          id="v7583_cf_status_firefox_esr153" selected
        >---
        </option>
  </select></td>
      </tr>
      <tr>
        <td class="tracking-flag-name">firefox148</td>
          <td class="tracking-flag-tracking"></td>
        <td class="tracking-flag-status"><input type="hidden" id="cf_status_firefox148-dirty">
  <select id="cf_status_firefox148" name="cf_status_firefox148">
        <option value="fixed"
          id="v7325_cf_status_firefox148" selected
        >fixed
        </option>
  </select></td>
      </tr>
      <tr>
        <td class="tracking-flag-name">firefox153</td>
          <td class="tracking-flag-tracking"><input type="hidden" id="cf_tracking_firefox153-dirty">
  <select id="cf_tracking_firefox153" name="cf_tracking_firefox153">
        <option value="---"
          id="v7514_cf_tracking_firefox153" selected
        >---
        </option>
  </select></td>
        <td class="tracking-flag-status"><input type="hidden" id="cf_status_firefox153-dirty">
  <select id="cf_status_firefox153" name="cf_status_firefox153">
        <option value="---"
          id="v7519_cf_status_firefox153" selected
        >---
        </option>
  </select></td>
      </tr>
      <tr>
        <td class="tracking-flag-name">firefox154</td>
          <td class="tracking-flag-tracking"><input type="hidden" id="cf_tracking_firefox154-dirty">
  <select id="cf_tracking_firefox154" name="cf_tracking_firefox154">
        <option value="---"
          id="v7548_cf_tracking_firefox154" selected
        >---
        </option>
  </select></td>
        <td class="tracking-flag-status"><input type="hidden" id="cf_status_firefox154-dirty">
  <select id="cf_status_firefox154" name="cf_status_firefox154">
        <option value="---"
          id="v7553_cf_status_firefox154" selected
        >---
        </option>
  </select></td>
      </tr>
      <tr>
        <td class="tracking-flag-name">firefox155</td>
          <td class="tracking-flag-tracking"><input type="hidden" id="cf_tracking_firefox155-dirty">
  <select id="cf_tracking_firefox155" name="cf_tracking_firefox155">
        <option value="---"
          id="v7626_cf_tracking_firefox155" selected
        >---
        </option>
  </select></td>
        <td class="tracking-flag-status"><input type="hidden" id="cf_status_firefox155-dirty">
  <select id="cf_status_firefox155" name="cf_status_firefox155">
        <option value="---"
          id="v7659_cf_status_firefox155" selected
        >---
        </option>
  </select></td>
      </tr>
  </table>
</div>
    </div>

  
</div>

</div>
  </div>
</section>



<section class="module" id="module-people"
>
    <header id="module-people-header" class="module-header">
      <div class="module-latch"
           data-label-expanded="Collapse People section"
           data-label-collapsed="Expand People section">
        <div class="module-spinner" role="button" tabindex="0"
             aria-controls="module-people-content"
             aria-expanded="false"
             aria-labeledby="module-people-title"
             aria-describedby="module-people-subtitle"></div>
        <h2 class="module-title" id="module-people-title">People</h2>
          <h3 class="module-subtitle" id="module-people-subtitle">
            (Reporter: neil, Assigned: gregp)
          </h3>
      </div>
    </header>
  <div class="module-content" id="module-people-content" style="display:none"
  ><div class="fields-lhs">

    <div class="field bug_modal edit-hide"
    id="field-assigned_to"
>
    <div class="name">
      
        <a href="https://wiki.mozilla.org/BMO/UserGuide/BugFields#assigned_to" id="assigned_to-help-link" class="help">Assignee:
        </a>
    </div>



  
    <div class="value">
        <span id="field-value-assigned_to"><div class="vcard vcard_685138" ><img src="https://secure.gravatar.com/avatar/6a80b118ba6712afa619c3864bbd2996?d=mm&size=40" class="gravatar" width="20" height="20"> <a class="email " href="/user_profile?user_id=685138" > <span class="fna">gregp</span></a>
</div>
        </span>
    </div>

  
</div><div class="field bug_modal edit-show"
    id="field-assigned_to" style="display:none"
>
    <div class="name">
      
        <a href="https://wiki.mozilla.org/BMO/UserGuide/BugFields#assigned_to" id="assigned_to-help-link" class="help">Assignee:
        </a>
    </div>



  
    <div class="value">
        <span id="field-value-assigned_to">
      <div class="set-default-container" style="display:none">
        <input type="checkbox" id="set-default-assignee" name="set_default_assignee" class="set-default"
          value="1" data-for="assigned_to">
        <label for="set-default-assignee">Reset Assignee to default</label>
      </div>
        </span>
    </div>

  
</div>

    <div class="field bug_modal edit-show"
    id="field-bug_mentors" style="display:none"
>
    <div class="name">
      
        <a href="https://wiki.mozilla.org/BMO/UserGuide/BugFields#bug_mentor" id="bug_mentors-help-link" class="help">Mentors:
        </a>
    </div>



  
    <div class="value">
        <span id="field-value-bug_mentors">---
        </span>
    </div>

  
</div>

    <div class="field bug_modal edit-show"
    id="field-qa_contact" style="display:none"
>
    <div class="name">
      
        <a href="https://wiki.mozilla.org/BMO/UserGuide/BugFields#qa_contact" id="qa_contact-help-link" class="help">QA Contact:
        </a>
    </div>



  
    <div class="value">
        <span id="field-value-qa_contact">
        <div class="set-default-container" style="display:none">
          <input type="checkbox" id="set-default-qa-contact" name="set_default_qa_contact" class="set-default"
            value="1" data-for="qa_contact">
          <label for="set-default-qa-contact">Reset QA Contact to default</label>
        </div>
        </span>
    </div>

  
</div>
</div><div class="fields-rhs">

    <div class="field bug_modal"
    id="field-reporter"
>
    <div class="name">
      
        <a href="https://wiki.mozilla.org/BMO/UserGuide/BugFields#reporter" id="reporter-help-link" class="help">Reporter:
        </a>
    </div>



  
    <div class="value">
        <span id="field-value-reporter">
            <div class="vcard vcard_14006" ><img src="https://secure.gravatar.com/avatar/4307f29a5e955ad308b790df81138d5d?d=mm&size=40" class="gravatar" width="20" height="20"> <a class="email " href="/user_profile?user_id=14006" > <span class="fna">neil</span></a>
</div>

        </span>
    </div>

  
</div>


    <div class="field bug_modal"
    id="field-triage_owner"
>
    <div class="name">
      
        <a href="https://wiki.mozilla.org/BMO/UserGuide/BugFields#triage_owner" id="triage_owner-help-link" class="help">Triage Owner:
        </a>
    </div>



  
    <div class="value">
        <span id="field-value-triage_owner">
            <div class="vcard vcard_34283" ><img src="https://secure.gravatar.com/avatar/900caab146bc7a489b3854cf10acf93f?d=mm&size=40" class="gravatar" width="20" height="20"> <a class="email " href="/user_profile?user_id=34283" > <span class="fna">masayuki</span></a>
</div>

        </span>
    </div>

  
</div>

    

    <div class="field bug_modal"
>
    <div class="name">
      
        <a href="https://wiki.mozilla.org/BMO/UserGuide/BugFields#cc" id="-help-link" class="help">CC:
        </a>
    </div>



  
    <div class=" container">


        <span aria-owns="cc-summary cc-latch">
          <span role="button" tabindex="0" id="cc-summary" data-count="24">24 people
          </span>
        </span>


        <div id="cc-list" style="display:none"></div>
    </div>

  
</div>
</div>
  </div>
</section>


<section class="module" id="module-references"
>
    <header id="module-references-header" class="module-header">
      <div class="module-latch"
           data-label-expanded="Collapse References section"
           data-label-collapsed="Expand References section">
        <div class="module-spinner" role="button" tabindex="0"
             aria-controls="module-references-content"
             aria-expanded="false"
             aria-labeledby="module-references-title"
             aria-describedby="module-references-subtitle"></div>
        <h2 class="module-title" id="module-references-title">References</h2>
          <h3 class="module-subtitle" id="module-references-subtitle">
            (Depends on 1 open bug, <div class="link">
      <span class="bug-url"
        title="data:text/html,&lt;input onclick=&quot;alert(event.originalTarget)&quot;&gt;">URL</span>
  </div>)
          </h3>
      </div>
    </header>
  <div class="module-content" id="module-references-content" style="display:none"
  >
<div class="fields-lhs">
    
    <div id="dependency-list-container" class="edit-show" ><div class="field bug_modal bug-list"
    id="field-dependson"
>
    <div class="name">
      
        <a href="https://wiki.mozilla.org/BMO/UserGuide/BugFields#dependson" id="dependson-help-link" class="help">Depends on:
        </a>
    </div>



  
    <div class="value">
        <span id="field-value-dependson">
            <div class="bug-list">
        <span class="bug-type-label iconic" title="defect"
              aria-label="defect" data-type="defect">
          <span class="icon" aria-hidden="true"></span>
        </span><a class="bz_bug_link
          bz_status_NEW"
   title="NEW - Make it impossible for untrusted JS to get access to native anonymous content"
   href="/show_bug.cgi?id=432586">432586</a>, <a class="bz_bug_link
          bz_status_RESOLVED bz_closed"
   title="RESOLVED FIXED - Centralize event dispatch"
   href="/show_bug.cgi?id=234455">234455</a>
      </div>

        </span>
    </div>

  
</div><div class="field bug_modal bug-list"
    id="field-blocked"
>
    <div class="name">
      
        <a href="https://wiki.mozilla.org/BMO/UserGuide/BugFields#blocks" id="blocked-help-link" class="help">Blocks:
        </a>
    </div>



  
    <div class="value">
        <span id="field-value-blocked">
            <div class="bug-list">
        <span class="bug-type-label iconic" title="defect"
              aria-label="defect" data-type="defect">
          <span class="icon" aria-hidden="true"></span>
        </span><a class="bz_bug_link
          bz_status_RESOLVED bz_closed"
   title="RESOLVED WORKSFORME - Permission denied to get property HTMLDivElement.parentNode"
   href="/show_bug.cgi?id=330961">330961</a>
      </div>

        </span>
    </div>

  
</div><div class="field bug_modal"
    id="field-dependencytree"
>
    <div class="name">
      
    </div>



  
    <div class=" container">
        <span id="field-value-dependencytree">
          Dependency <a href="/showdependencytree.cgi?id=208427&amp;hide_resolved=1">tree</a>
          / <a href="/showdependencygraph.cgi?id=208427">graph</a>
        </span>
    </div>

  
</div>
    </div>

    <div class="field bug_modal bug-list edit-show"
    id="field-regresses" style="display:none"
>
    <div class="name">
      
        <a href="https://wiki.mozilla.org/BMO/UserGuide/BugFields#regresses" id="regresses-help-link" class="help">Regressions:
        </a>
    </div>



  
    <div class="value">
        <span id="field-value-regresses">
        ---
        </span>
    </div>

  
</div><div class="field bug_modal bug-list edit-show"
    id="field-regressed_by" style="display:none"
>
    <div class="name">
      
        <a href="https://wiki.mozilla.org/BMO/UserGuide/BugFields#regressed_by" id="regressed_by-help-link" class="help">Regressed by:
        </a>
    </div>



  
    <div class="value">
        <span id="field-value-regressed_by">
        ---
        </span>
    </div>

  
</div>

    <div class="field bug_modal bug-list"
>
    <div class="name">
      
        <a href="https://wiki.mozilla.org/BMO/UserGuide/BugFields#duplicates" id="-help-link" class="help">Duplicates:
        </a>
    </div>



  
    <div class="value">
            <div class="bug-list">
        <span class="bug-type-label iconic" title="defect"
              aria-label="defect" data-type="defect">
          <span class="icon" aria-hidden="true"></span>
        </span><a class="bz_bug_link
          bz_status_RESOLVED bz_closed"
   title="RESOLVED DUPLICATE - Error: uncaught exception: Permission denied to get property HTMLDivElement.parentNode"
   href="/show_bug.cgi?id=214340">214340</a>, <a class="bz_bug_link
          bz_status_RESOLVED bz_closed"
   title="RESOLVED DUPLICATE - Properies of Range instances error when pressing arrows of number input"
   href="/show_bug.cgi?id=1258484">1258484</a>
      </div>

    </div>

  
</div>
</div><div class="fields-rhs">

    <div class="field bug_modal"
    id="field-bug_file_loc"
>
    <div class="name">
      
        <a href="https://wiki.mozilla.org/BMO/UserGuide/BugFields#bug_file_loc" id="bug_file_loc-help-link" class="help">URL:
        </a>
    </div>



  
    <div class="value">
        <span id="field-value-bug_file_loc"><div class="link">
      <span class="bug-url"
        title="data:text/html,&lt;input onclick=&quot;alert(event.originalTarget)&quot;&gt;">data:text/html,&lt;input onclick=&quot;alert(...</span>
  </div>
        </span>
    </div>

  
</div>

    <div class="field bug_modal edit-show"
    id="field-see_also" style="display:none"
>
    <div class="name">
      
        <a href="https://wiki.mozilla.org/BMO/UserGuide/BugFields#see_also" id="see_also-help-link" class="help">See Also:
        </a>
    </div>



  
    <div class="value">
        <span id="field-value-see_also">
        ---
        </span>
    </div>

  
</div>
</div>
  </div>
</section>


<section class="module" id="module-details"
>
    <header id="module-details-header" class="module-header">
      <div class="module-latch"
           data-label-expanded="Collapse Details section"
           data-label-collapsed="Expand Details section">
        <div class="module-spinner" role="button" tabindex="0"
             aria-controls="module-details-content"
             aria-expanded="false"
             aria-labeledby="module-details-title"
             aria-describedby="module-details-subtitle"></div>
        <h2 class="module-title" id="module-details-title">Details</h2>
          <h3 class="module-subtitle" id="module-details-subtitle">
            (Whiteboard: [firebug-p3])
          </h3>
      </div>
    </header>
  <div class="module-content" id="module-details-content" style="display:none"
  ><div class="fields-lhs">

    <div class="field bug_modal edit-show"
    id="field-alias" style="display:none"
>
    <div class="name">
      
        <a href="https://wiki.mozilla.org/BMO/UserGuide/BugFields#alias" id="alias-help-link" class="help">Alias:
        </a>
    </div>



  
    <div class="value">
        <span id="field-value-alias">
        ---
        </span>
    </div>

  
</div>

    <div class="field bug_modal edit-show"
    id="field-keywords" style="display:none"
>
    <div class="name">
      
        <a href="/describekeywords.cgi" id="keywords-help-link" class="help">Keywords:
        </a>
    </div>



  
    <div class="value">
        <span id="field-value-keywords">---
        </span>
    </div>

  
</div>

    <div class="field bug_modal"
    id="field-status_whiteboard"
>
    <div class="name">
      
        <a href="https://wiki.mozilla.org/BMO/UserGuide/Whiteboard" id="status_whiteboard-help-link" class="help">Whiteboard:
        </a>
    </div>



  
    <div class="value">
        <span id="field-value-status_whiteboard">[firebug-p3]
        </span>
    </div>

  
</div><div class="field bug_modal"
    id="field-cf_qa_whiteboard"
>
    <div class="name">
      QA Whiteboard:
    </div>



  
    <div class="value">
        <span id="field-value-cf_qa_whiteboard">
            [qa-triage-done-c149/b148]

        </span>
    </div>

  
</div>

    <div class="field bug_modal edit-show"
    id="field-cf_has_str" style="display:none"
>
    <div class="name">
      Has STR:
    </div>



  
    <div class="value">
        <span id="field-value-cf_has_str">
            ---

        </span>
    </div>

  
</div><div class="field bug_modal edit-show"
    id="field-cf_cab_review" style="display:none"
>
    <div class="name">
      Change Request:
    </div>



  
    <div class="value">
        <span id="field-value-cf_cab_review">
            ---

        </span>
    </div>

  
</div>

    <div class="field bug_modal"
    id="field-votes"
>
    <div class="name">
      
        <a href="https://wiki.mozilla.org/BMO/UserGuide/BugFields#votes" id="votes-help-link" class="help">Votes:
        </a>
    </div>



  
    <div class=" container">
        <span id="field-value-votes">12
        </span>
    </div>

  
</div>
</div><div class="fields-rhs">

    <div class="field bug_modal edit-show"
    id="field-bug_flags" style="display:none"
>
    <div class="name">
      Bug Flags:
    </div>



  
    <div class=" container">
        <span id="field-value-bug_flags"><div id="bug-flags" class="flags">
  <table class="layout-table">
    <tbody class="edit-show" style="display:none"><tr>
    <td class="flag-setter">
    </td>

    <td class="flag-name">
      <label title="Is this bug/feature enabled in a release by a pref flag?" for="flag_type-930">behind-pref</label>
    </td>

    <td class="flag-value">
      <input type="hidden" id="flag_type-930-dirty">
      <select id="flag_type-930" name="flag_type-930"
        title="Is this bug/feature enabled in a release by a pref flag?"
          disabled
        class="bug-flag">
          <option value="X"></option>
      </select>
    </td>


  </tr><tr>
    <td class="flag-setter">
    </td>

    <td class="flag-name">
      <label title="Flag tracking inclusion in the desktop Firefox product backlog." for="flag_type-846">firefox-backlog</label>
    </td>

    <td class="flag-value">
      <input type="hidden" id="flag_type-846-dirty">
      <select id="flag_type-846" name="flag_type-846"
        title="Flag tracking inclusion in the desktop Firefox product backlog."
          disabled
        class="bug-flag">
          <option value="X"></option>
      </select>
    </td>


  </tr><tr>
    <td class="flag-setter">
    </td>

    <td class="flag-name">
      <label title="Flag is used to track security bug bounty nominations. Mail security(at)mozilla.org to nominate a bug." for="flag_type-803">sec-bounty</label>
    </td>

    <td class="flag-value">
      <input type="hidden" id="flag_type-803-dirty">
      <select id="flag_type-803" name="flag_type-803"
        title="Flag is used to track security bug bounty nominations. Mail security(at)mozilla.org to nominate a bug."
        class="bug-flag">
          <option value="X"></option>
            <option value="?" >?</option>
      </select>
    </td>


  </tr><tr>
    <td class="flag-setter">
    </td>

    <td class="flag-name">
      <label title="Flag is used to track whether the bug report is eligible for inclusion in the Bug Bounty Hall of Fame." for="flag_type-913">sec-bounty-hof</label>
    </td>

    <td class="flag-value">
      <input type="hidden" id="flag_type-913-dirty">
      <select id="flag_type-913" name="flag_type-913"
        title="Flag is used to track whether the bug report is eligible for inclusion in the Bug Bounty Hall of Fame."
          disabled
        class="bug-flag">
          <option value="X"></option>
      </select>
    </td>


  </tr><tr>
    <td class="flag-setter">
    </td>

    <td class="flag-name">
      <label title="Whether the bug has a testcase in the qa test suite or not. Set it to &quot;in-qa-testsuite?&quot; if the bug needs a testcase (only set this if the bug actually *needs* a testcase - not all bugs do, even layout bugs!), set it to &quot;in-qa-testsuite+&quot; if the bug has an appropriate testcase, and set it to &quot;in-qa-testsuite-&quot; if the bug doesn't need an explicit testcase (e.g. for code cleanup bugs). Only QA actively working on test cases in the component should use this keyword." for="flag_type-787">in-qa-testsuite</label>
    </td>

    <td class="flag-value">
      <input type="hidden" id="flag_type-787-dirty">
      <select id="flag_type-787" name="flag_type-787"
        title="Whether the bug has a testcase in the qa test suite or not. Set it to &quot;in-qa-testsuite?&quot; if the bug needs a testcase (only set this if the bug actually *needs* a testcase - not all bugs do, even layout bugs!), set it to &quot;in-qa-testsuite+&quot; if the bug has an appropriate testcase, and set it to &quot;in-qa-testsuite-&quot; if the bug doesn't need an explicit testcase (e.g. for code cleanup bugs). Only QA actively working on test cases in the component should use this keyword."
          disabled
        class="bug-flag">
          <option value="X"></option>
      </select>
    </td>

      <td class="flag-requestee">
        <div id="requestee_type-787-container" style="display:none"><input
    name="requestee_type-787"
    value="" class="requestee bz_autocomplete_user"  id="requestee_type-787" 
  >
        </div>
      <td>

  </tr><tr>
    <td class="flag-setter">
    </td>

    <td class="flag-name">
      <label title="Whether the bug has a testcase in the test suite or not. Set it to &quot;in-testsuite?&quot; if the bug needs a testcase (only set this if the bug actually *needs* a testcase - not all bugs do, even layout bugs!), set it to &quot;in-testsuite+&quot; if the bug has an appropriate testcase, and set it to &quot;in-testsuite-&quot; if the bug doesn't need an explicit testcase (e.g. for code cleanup bugs). Only QA actively working on test cases in the component should use this keyword." for="flag_type-37">in-testsuite</label>
    </td>

    <td class="flag-value">
      <input type="hidden" id="flag_type-37-dirty">
      <select id="flag_type-37" name="flag_type-37"
        title="Whether the bug has a testcase in the test suite or not. Set it to &quot;in-testsuite?&quot; if the bug needs a testcase (only set this if the bug actually *needs* a testcase - not all bugs do, even layout bugs!), set it to &quot;in-testsuite+&quot; if the bug has an appropriate testcase, and set it to &quot;in-testsuite-&quot; if the bug doesn't need an explicit testcase (e.g. for code cleanup bugs). Only QA actively working on test cases in the component should use this keyword."
          disabled
        class="bug-flag">
          <option value="X"></option>
      </select>
    </td>


  </tr><tr>
    <td class="flag-setter">
    </td>

    <td class="flag-name">
      <label title="qe-verify: + ➜ request to verify the bug manually
qe-verify: – ➜ the bug will not/can not be verified manually" for="flag_type-864">qe-verify</label>
    </td>

    <td class="flag-value">
      <input type="hidden" id="flag_type-864-dirty">
      <select id="flag_type-864" name="flag_type-864"
        title="qe-verify: + ➜ request to verify the bug manually
qe-verify: – ➜ the bug will not/can not be verified manually"
          disabled
        class="bug-flag">
          <option value="X"></option>
      </select>
    </td>


  </tr>
    </tbody>
  </table>
</div>
        </span>
    </div>

  
</div>
</div>

  
  </div>
</section>


<section class="module edit-show" style="display:none" id="module-crash-data"
>
    <header id="module-crash-data-header" class="module-header">
      <div class="module-latch"
           data-label-expanded="Collapse Crash Data section"
           data-label-collapsed="Expand Crash Data section">
        <div class="module-spinner" role="button" tabindex="0"
             aria-controls="module-crash-data-content"
             aria-expanded="false"
             aria-labeledby="module-crash-data-title"
             aria-describedby="module-crash-data-subtitle"></div>
        <h2 class="module-title" id="module-crash-data-title">Crash Data</h2>
      </div>
    </header>
  <div class="module-content" id="module-crash-data-content" style="display:none"
  ><div class="field bug_modal edit-show"
    id="field-cf_crash_signature" style="display:none"
>
    <div class="name">
      Signature:
    </div>



  
    <div class="value">
        <span id="field-value-cf_crash_signature">
    <em>None</em>
        </span>
    </div>

  
</div>
  </div>
</section>


<section class="module edit-show" style="display:none" id="module-security"
>
    <header id="module-security-header" class="module-header">
      <div class="module-latch"
           data-label-expanded="Collapse Security section"
           data-label-collapsed="Expand Security section">
        <div class="module-spinner" role="button" tabindex="0"
             aria-controls="module-security-content"
             aria-expanded="false"
             aria-labeledby="module-security-title"
             aria-describedby="module-security-subtitle"></div>
        <h2 class="module-title" id="module-security-title">Security</h2>
          <h3 class="module-subtitle" id="module-security-subtitle">
            (public)
          </h3>
      </div>
    </header>
  <div class="module-content" id="module-security-content" style="display:none"
  ><div class="groups edit-hide">
    This bug is publicly visible.
</div>

<div class="groups edit-show" style="display:none">


</div>
  </div>
</section>


<section class="module edit-show" style="display:none" id="module-user-story" data-non-stick="1"
>
    <header id="module-user-story-header" class="module-header">
      <div class="module-latch"
           data-label-expanded="Collapse User Story section"
           data-label-collapsed="Expand User Story section">
        <div class="module-spinner" role="button" tabindex="0"
             aria-controls="module-user-story-content"
             aria-expanded="false"
             aria-labeledby="module-user-story-title"
             aria-describedby="module-user-story-subtitle"></div>
        <h2 class="module-title" id="module-user-story-title">User Story</h2>
      </div>
    </header>
  <div class="module-content" id="module-user-story-content" style="display:none"
  >
    <pre id="user-story"></pre>
  </div>
</section>







<section class="module" id="module-attachments"
>
    <header id="module-attachments-header" class="module-header">
      <div class="module-latch"
           data-label-expanded="Collapse Attachments section"
           data-label-collapsed="Expand Attachments section">
        <div class="module-spinner" role="button" tabindex="0"
             aria-controls="module-attachments-content"
             aria-expanded="true"
             aria-labeledby="module-attachments-title"
             aria-describedby="module-attachments-subtitle"></div>
        <h2 class="module-title" id="module-attachments-title">Attachments</h2>
          <h3 class="module-subtitle" id="module-attachments-subtitle">
            (1 file)
          </h3>
      </div>
    </header>
  <div class="module-content" id="module-attachments-content"
  ><table role="table" class="responsive" id="attachments">
    <tr data-attachment-id="9536762" class=" attach-patch
    " >
      <td class="attach-desc-td">
        <div class="attach-desc">
          <a href="/attachment.cgi?id=9536762" > Bug 208427 - Retarget originalTarget to closest non-NAC when caller is not chrome
            </a>
        </div>
        <div>
            <a href="#c29" class="attach-time activity-ref"><span class="rel-time" title="2026-01-09 16:04 PST" data-time="1768003491">6 months ago</span></a>
          <span class="attach-author"><div class="vcard vcard_685138" ><a class="email " href="/user_profile?user_id=685138" > <span class="fna">Gregory Pappas [:gregp]</span></a>
</div></span>
        </div>
        <div class="attach-info">48 bytes,
          text/x-phabricator-request        </div>
      </td>
      <td></td>
      <td class="attach-actions">
        <a href="/attachment.cgi?id=9536762&amp;action=edit" data-details="1">Details</a>&#x0020; |
  <a href="/attachment.cgi?id=9536762">Review</a>
    </tr>
</table>

<footer id="attachments-footer">
  <div id="attachments-actions">
  </div>
  
</footer>
  </div>
</section>



<script nonce="he6qSVFoCPoA6tmtr4ukHwvEHmd4KfMeKhpbT69SDStTp4nu">
  init_module_visibility();
</script>




<meta name="firefox-versions" content="{&quot;FIREFOX_AURORA&quot;:&quot;&quot;,&quot;FIREFOX_DEVEDITION&quot;:&quot;153.0b13&quot;,&quot;FIREFOX_ESR&quot;:&quot;140.12.0esr&quot;,&quot;FIREFOX_ESR115&quot;:&quot;115.37.0esr&quot;,&quot;FIREFOX_ESR_NEXT&quot;:&quot;&quot;,&quot;FIREFOX_NIGHTLY&quot;:&quot;154.0a1&quot;,&quot;LAST_MERGE_DATE&quot;:&quot;2026-06-15&quot;,&quot;LAST_RELEASE_DATE&quot;:&quot;2026-06-16&quot;,&quot;LAST_STRINGFREEZE_DATE&quot;:&quot;2026-06-12&quot;,&quot;LATEST_FIREFOX_DEVEL_VERSION&quot;:&quot;153.0b13&quot;,&quot;LATEST_FIREFOX_OLDER_VERSION&quot;:&quot;3.6.28&quot;,&quot;LATEST_FIREFOX_RELEASED_DEVEL_VERSION&quot;:&quot;153.0b13&quot;,&quot;LATEST_FIREFOX_VERSION&quot;:&quot;152.0.6&quot;,&quot;NEXT_MERGE_DATE&quot;:&quot;2026-07-20&quot;,&quot;NEXT_RELEASE_DATE&quot;:&quot;2026-07-21&quot;,&quot;NEXT_STRINGFREEZE_DATE&quot;:&quot;2026-07-17&quot;}">


<div id="comment-actions">
    <button type="button" id="bottom-btn" class="secondary" aria-label="Go to Page Bottom">Bottom &darr;</button>
  <div class="dropdown">
    <button type="button" id="comment-tags-btn" aria-haspopup="true" aria-label="Tags"
      aria-expanded="false" aria-controls="comment-tags-menu" class="dropdown-button minor">Tags &#9662;</button>
    <ul id="comment-tags-menu" role="menu" tabindex="0" class="dropdown-content left" style="display:none">
      <li role="presentation">
        <a role="menuitem" tabindex="-1" data-comment-tag="">Reset</a>
      </li>
    </ul>
  </div>
  <div class="dropdown">
    <button type="button" id="view-menu-btn" aria-haspopup="true" aria-label="Timeline"
      aria-expanded="false" aria-controls="view-menu" class="dropdown-button minor">Timeline &#9662;</button>
    <ul id="view-menu" role="menu" tabindex="0" class="dropdown-content left" style="display:none">
      <li role="presentation">
        <a id="view-reset" role="menuitem" tabindex="-1">Reset</a>
      </li>
      <li role="separator"></li>
      <li role="presentation">
        <a id="view-collapse-all" role="menuitem" tabindex="-1">Collapse All</a>
      </li>
      <li role="presentation">
        <a id="view-expand-all" role="menuitem" tabindex="-1">Expand All</a>
      </li>
      <li role="presentation">
        <a id="view-comments-only" role="menuitem" tabindex="-1">Comments Only</a>
      </li>
    </ul>
   </div>
</div>
<div class="change-set" id="c0"><div class="comment" data-id="1871749" data-no="0"
       data-tags="">
    
    <table class="layout-table change-head reporter" id="ch-0" role="presentation">
      <tr>
          <td rowspan="2" class="change-gravatar"><div class="vcard vcard_14006" ><img src="https://secure.gravatar.com/avatar/4307f29a5e955ad308b790df81138d5d?d=mm&size=64" class="gravatar" width="32" height="32">
</div>
          </td>

          <td class="change-author"><div class="vcard vcard_14006" ><a class="email " href="/user_profile?user_id=14006" > <span class="fna">neil&#64;parkwaycc.co.uk</span></a>
</div>
              <span class="user-role">Reporter</span>
          </td>

        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="cs-0"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>

      <tr id="cr-0" >
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#c0">Description</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2003-06-05 09:29 PDT" data-time="1054830557">23 years ago</span>
          </div>
        </td>
      </tr>

      <tr id="ctag-0">
        <td colspan="2" class="comment-tags">
        </td>
      </tr>
    </table>

    
  </div><div
      class="comment-text  "
      id="ct-0" data-comment-id="1871749">Steps to reproduce problem:
1. Load the URL
2. Click on the input

Expected results: [object HTMLInputElement]

Actual results: [object HTMLDivElement]

This has no security ramifications because the div element is restricted.
Howver this does make it impossible for content to use originalTarget.</div></div><div class="change-set" id="c1"><div class="comment" data-id="1922340" data-no="1"
       data-tags="">
    
    <table class="layout-table change-head " id="ch-1" role="presentation">
      <tr>
          <td rowspan="2" class="change-gravatar"><div class="vcard vcard_20209" ><img src="extensions/Gravatar/web/default.jpg" class="gravatar" width="32" height="32">
</div>
          </td>

          <td class="change-author"><div class="vcard vcard_20209" ><a class="email " href="/user_profile?user_id=20209" > <span class="fna">Boris Zbarsky [:bzbarsky]</span></a>
</div>
          </td>

        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="cs-1"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>

      <tr id="cr-1" >
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#c1">Comment 1</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2003-07-30 10:16 PDT" data-time="1059585413">22 years ago</span>
          </div>
        </td>
      </tr>

      <tr id="ctag-1">
        <td colspan="2" class="comment-tags">
        </td>
      </tr>
    </table>

    
  </div><div
      class="comment-text  "
      id="ct-1" data-comment-id="1922340">*** <a class="bz_bug_link
          bz_status_RESOLVED bz_closed"
   title="RESOLVED DUPLICATE - Error: uncaught exception: Permission denied to get property HTMLDivElement.parentNode"
   href="/show_bug.cgi?id=214340">Bug 214340</a> has been marked as a duplicate of this bug. ***</div></div><div class="change-set" id="c2"><div class="comment" data-id="1922349" data-no="2"
       data-tags="">
    
    <table class="layout-table change-head " id="ch-2" role="presentation">
      <tr>
          <td rowspan="2" class="change-gravatar"><div class="vcard vcard_20209" ><img src="extensions/Gravatar/web/default.jpg" class="gravatar" width="32" height="32">
</div>
          </td>

          <td class="change-author"><div class="vcard vcard_20209" ><a class="email " href="/user_profile?user_id=20209" > <span class="fna">Boris Zbarsky [:bzbarsky]</span></a>
</div>
          </td>

        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="cs-2"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>

      <tr id="cr-2" >
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#c2">Comment 2</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2003-07-30 10:33 PDT" data-time="1059586382">22 years ago</span>
          </div>
        </td>
      </tr>

      <tr id="ctag-2">
        <td colspan="2" class="comment-tags">
        </td>
      </tr>
    </table>

    
  </div><div
      class="comment-text  "
      id="ct-2" data-comment-id="1922349">Also happens for relatedTarget.

In short, the event needs to be retargeted when it crosses the content boundary
from inside the input to outside it...  XBL does this naturally; the hacks that
we use for input may need some work to do it.</div></div><div class="change-set" id="c3"><div class="comment" data-id="1971686" data-no="3"
       data-tags="">
    
    <table class="layout-table change-head " id="ch-3" role="presentation">
      <tr>
          <td rowspan="2" class="change-gravatar"><div class="vcard vcard_114456" ><img src="extensions/Gravatar/web/default.jpg" class="gravatar" width="32" height="32">
</div>
          </td>

          <td class="change-author"><div class="vcard vcard_114456" ><a class="email disabled" href="/user_profile?user_id=114456" > <span class="fna">Leif W</span></a>
</div>
          </td>

        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="cs-3"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>

      <tr id="cr-3" >
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#c3">Comment 3</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2003-10-03 09:40 PDT" data-time="1065199233">22 years ago</span>
          </div>
        </td>
      </tr>

      <tr id="ctag-3">
        <td colspan="2" class="comment-tags">
        </td>
      </tr>
    </table>

    
  </div><div
      class="comment-text  "
      id="ct-3" data-comment-id="1971686">As mentioned in the duplicate <a class="bz_bug_link
          bz_status_RESOLVED bz_closed"
   title="RESOLVED DUPLICATE - Error: uncaught exception: Permission denied to get property HTMLDivElement.parentNode"
   href="/show_bug.cgi?id=214340">bug 214340</a>, this error also affects javascript
code when triggered by a mouseover/mouseout event over a text input inside a
div.  I've noticed with Mozilla 1.5 rc2 that the error still exists, but the
error message has changed (trivially less information).

Is there any idea on if or when this bug will be fixed?  It has been some months
and there's been no followups.

--
With Mozilla 1.4 it was:

Error: [Exception... &quot;'Permission denied to get property
HTMLDivElement.parentNode' when calling method:
[nsIDOMEventListener::handleEvent]&quot;  nsresult: &quot;0x8057001e
(NS_ERROR_XPC_JS_THREW_STRING)&quot;  location: &quot;&lt;unknown&gt;&quot;  data: no]

And with Mozilla 1.5 rc2 it is:

Error: uncaught exception: Permission denied to get property
HTMLDivElement.parentNode

Example code which causes the error (extracted from URL in duplicate <a class="bz_bug_link
          bz_status_RESOLVED bz_closed"
   title="RESOLVED DUPLICATE - Error: uncaught exception: Permission denied to get property HTMLDivElement.parentNode"
   href="/show_bug.cgi?id=214340">bug 214340</a>):

[...]

function scan ( e )
{
    var r = e.relatedTarget;

    while ( r &amp;&amp; r.parentNode )
    {
        r = r.parentNode;
        //alert(r);
    }
};

[...]

&lt;DIV ID=&quot;dv&quot; STYLE=&quot;position:absolute;left:100;top:100&quot;&gt;
  &lt;FORM NAME=&quot;frm&quot;&gt;
    &lt;INPUT TYPE=&quot;textbox&quot; NAME=&quot;tbox&quot; VALUE=&quot;test...&quot;
      ONMOUSEOVER=&quot;scan( event );&quot;
      ONMOUSEOUT=&quot;scan( event );&quot;&gt;
  &lt;/FORM&gt;
&lt;/DIV&gt;

[...]</div></div><div class="change-set" id="c4"><div class="comment" data-id="2241539" data-no="4"
       data-tags="">
    
    <table class="layout-table change-head " id="ch-4" role="presentation">
      <tr>
          <td rowspan="2" class="change-gravatar"><div class="vcard vcard_138428" ><img src="extensions/Gravatar/web/default.jpg" class="gravatar" width="32" height="32">
</div>
          </td>

          <td class="change-author"><div class="vcard vcard_138428" ><a class="email disabled" href="/user_profile?user_id=138428" > <span class="fna">Corey Gilmore</span></a>
</div>
          </td>

        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="cs-4"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>

      <tr id="cr-4" >
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#c4">Comment 4</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2004-08-25 11:15 PDT" data-time="1093457747">21 years ago</span>
          </div>
        </td>
      </tr>

      <tr id="ctag-4">
        <td colspan="2" class="comment-tags">
        </td>
      </tr>
    </table>

    
  </div><div
      class="comment-text  "
      id="ct-4" data-comment-id="2241539">Just a gentle reminder that this bug is present in the latest official release
of Firefox on Windows,
Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.7) Gecko/20040803 Firefox/0.9.3

I haven't tested on any other platforms.</div></div><div class="change-set" id="a86363357_20209"><div class="change" id="aa86363357_20209">
    <table class="layout-table change-head " role="presentation">
      <tr>
        <td rowspan="2" class="change-gravatar"><div class="vcard vcard_20209" id="a86363357_20209"><img src="extensions/Gravatar/web/default.jpg" class="gravatar" width="32" height="32">
</div>
        </td>
        <td class="change-author"><div class="vcard vcard_20209" id="a86363357_20209"><a class="email " href="/user_profile?user_id=20209" > <span class="fna">Boris Zbarsky [:bzbarsky]</span></a>
</div>
        </td>
        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="as-a86363357_20209"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>
      <tr id="ar-a86363357_20209">
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#a86363357_20209">Updated</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2006-02-28 22:18 PST" data-time="1141193914">20 years ago</span>
          </div>
        </td>
      </tr>
    </table>
  </div><div class="activity"><div class="change">Depends on: <a class="bz_bug_link
          bz_status_RESOLVED bz_closed"
   title="RESOLVED FIXED - Centralize event dispatch"
   href="/show_bug.cgi?id=234455">234455</a></div></div></div><div class="change-set" id="c5"><div class="comment" data-id="2790650" data-no="5"
       data-tags="">
    
    <table class="layout-table change-head " id="ch-5" role="presentation">
      <tr>
          <td rowspan="2" class="change-gravatar"><div class="vcard vcard_39966" id="a86363357_20209"><img src="https://secure.gravatar.com/avatar/056757eff6ed7c8ec26f61e3bf7695fe?d=mm&size=64" class="gravatar" width="32" height="32">
</div>
          </td>

          <td class="change-author"><div class="vcard vcard_39966" id="a86363357_20209"><a class="email " href="/user_profile?user_id=39966" > <span class="fna">Olli Pettay [:smaug][bugs&#64;pettay.fi]</span></a>
</div>
          </td>

        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="cs-5"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>

      <tr id="cr-5" >
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#c5">Comment 5</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2006-02-28 23:27 PST" data-time="1141198033">20 years ago</span>
          </div>
        </td>
      </tr>

      <tr id="ctag-5">
        <td colspan="2" class="comment-tags">
        </td>
      </tr>
    </table>

    
  </div><div
      class="comment-text  "
      id="ct-5" data-comment-id="2790650">IMO, one should not be able to access native anonymous in anyway from
(at least untrusted) scripts. For C++ we could to remove
.tmpRealOriginalTarget and have .realOriginalTarget, which would point to the
very first target (before any retargeting) in the event target chain.</div></div><div class="change-set" id="c6"><div class="comment" data-id="2903280" data-no="6"
       data-tags="">
    
    <table class="layout-table change-head " id="ch-6" role="presentation">
      <tr>
          <td rowspan="2" class="change-gravatar"><div class="vcard vcard_207825" id="a86363357_20209"><img src="extensions/Gravatar/web/default.jpg" class="gravatar" width="32" height="32">
</div>
          </td>

          <td class="change-author"><div class="vcard vcard_207825" id="a86363357_20209"><a class="email disabled" href="/user_profile?user_id=207825" > <span class="fna">Jen</span></a>
</div>
          </td>

        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="cs-6"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>

      <tr id="cr-6" >
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#c6">Comment 6</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2006-07-06 09:29 PDT" data-time="1152203391">20 years ago</span>
          </div>
        </td>
      </tr>

      <tr id="ctag-6">
        <td colspan="2" class="comment-tags">
        </td>
      </tr>
    </table>

    
  </div><div
      class="comment-text  "
      id="ct-6" data-comment-id="2903280">I am having this same problem when clicking inside of &lt;input&gt;'s. The &lt;input&gt;'s it is happening on do not have events.  

However, the common factor is that I have fckeditor running on these pages also, so perhaps a problem with focusing from that element to the &lt;input&gt;'s?</div></div><div class="change-set" id="a99810440_55600"><div class="change" id="aa99810440_55600">
    <table class="layout-table change-head " role="presentation">
      <tr>
        <td rowspan="2" class="change-gravatar"><div class="vcard vcard_55600" id="a99810440_55600"><img src="https://secure.gravatar.com/avatar/1ecb17d06c0dc059332f0f5fb330984e?d=mm&size=64" class="gravatar" width="32" height="32">
</div>
        </td>
        <td class="change-author"><div class="vcard vcard_55600" id="a99810440_55600"><a class="email " href="/user_profile?user_id=55600" > <span class="fna">Martijn Wargers (dead)</span></a>
</div>
        </td>
        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="as-a99810440_55600"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>
      <tr id="ar-a99810440_55600">
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#a99810440_55600">Updated</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2006-08-03 14:36 PDT" data-time="1154640997">19 years ago</span>
          </div>
        </td>
      </tr>
    </table>
  </div><div class="activity"><div class="change">Blocks: <a class="bz_bug_link
          bz_status_RESOLVED bz_closed"
   title="RESOLVED WORKSFORME - Permission denied to get property HTMLDivElement.parentNode"
   href="/show_bug.cgi?id=330961">330961</a></div></div></div><div class="change-set" id="c7"><div class="comment" data-id="3206384" data-no="7"
       data-tags="">
    
    <table class="layout-table change-head " id="ch-7" role="presentation">
      <tr>
          <td rowspan="2" class="change-gravatar"><div class="vcard vcard_46227" id="a99810440_55600"><img src="https://secure.gravatar.com/avatar/836516cba1a651354533d8911667fde0?d=mm&size=64" class="gravatar" width="32" height="32">
</div>
          </td>

          <td class="change-author"><div class="vcard vcard_46227" id="a99810440_55600"><a class="email " href="/user_profile?user_id=46227" > <span class="fna">Mihai Bazon</span></a>
</div>
          </td>

        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="cs-7"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>

      <tr id="cr-7" >
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#c7">Comment 7</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2007-06-06 07:11 PDT" data-time="1181139062">19 years ago</span>
          </div>
        </td>
      </tr>

      <tr id="ctag-7">
        <td colspan="2" class="comment-tags">
        </td>
      </tr>
    </table>

    
  </div><div
      class="comment-text  "
      id="ct-7" data-comment-id="3206384">Any updates on this? -- or possible ways to work around it?</div></div><div class="change-set" id="c8"><div class="comment" data-id="3207142" data-no="8"
       data-tags="">
    
    <table class="layout-table change-head " id="ch-8" role="presentation">
      <tr>
          <td rowspan="2" class="change-gravatar"><div class="vcard vcard_39966" id="a99810440_55600"><img src="https://secure.gravatar.com/avatar/056757eff6ed7c8ec26f61e3bf7695fe?d=mm&size=64" class="gravatar" width="32" height="32">
</div>
          </td>

          <td class="change-author"><div class="vcard vcard_39966" id="a99810440_55600"><a class="email " href="/user_profile?user_id=39966" > <span class="fna">Olli Pettay [:smaug][bugs&#64;pettay.fi]</span></a>
</div>
          </td>

        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="cs-8"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>

      <tr id="cr-8" >
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#c8">Comment 8</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2007-06-06 13:38 PDT" data-time="1181162327">19 years ago</span>
          </div>
        </td>
      </tr>

      <tr id="ctag-8">
        <td colspan="2" class="comment-tags">
        </td>
      </tr>
    </table>

    
  </div><div
      class="comment-text  "
      id="ct-8" data-comment-id="3207142">use .target? </div></div><div class="change-set" id="c9"><div class="comment" data-id="3282449" data-no="9"
       data-tags="">
    
    <table class="layout-table change-head " id="ch-9" role="presentation">
      <tr>
          <td rowspan="2" class="change-gravatar"><div class="vcard vcard_286152" id="a99810440_55600"><img src="extensions/Gravatar/web/default.jpg" class="gravatar" width="32" height="32">
</div>
          </td>

          <td class="change-author"><div class="vcard vcard_286152" id="a99810440_55600"><a class="email disabled" href="/user_profile?user_id=286152" > <span class="fna">ed</span></a>
</div>
          </td>

        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="cs-9"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>

      <tr id="cr-9" >
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#c9">Comment 9</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2007-08-16 08:45 PDT" data-time="1187279153">18 years ago</span>
          </div>
        </td>
      </tr>

      <tr id="ctag-9">
        <td colspan="2" class="comment-tags">
        </td>
      </tr>
    </table>

    
  </div><div
      class="comment-text  "
      id="ct-9" data-comment-id="3282449">Does anyone have a workaround for this issue? I am in shock that for one time in my life I have to redesign because of a bug in firefox not ie. How can I detect the issue because it occurs outside of a function and happens on focus to the textbox? Anyone? ANYONE? ok anyone?</div></div><div class="change-set" id="c10"><div class="comment" data-id="3282460" data-no="10"
       data-tags="">
    
    <table class="layout-table change-head " id="ch-10" role="presentation">
      <tr>
          <td rowspan="2" class="change-gravatar"><div class="vcard vcard_286152" id="a99810440_55600"><img src="extensions/Gravatar/web/default.jpg" class="gravatar" width="32" height="32">
</div>
          </td>

          <td class="change-author"><div class="vcard vcard_286152" id="a99810440_55600"><a class="email disabled" href="/user_profile?user_id=286152" > <span class="fna">ed</span></a>
</div>
          </td>

        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="cs-10"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>

      <tr id="cr-10" >
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#c10">Comment 10</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2007-08-16 09:11 PDT" data-time="1187280667">18 years ago</span>
          </div>
        </td>
      </tr>

      <tr id="ctag-10">
        <td colspan="2" class="comment-tags">
        </td>
      </tr>
    </table>

    
  </div><div
      class="comment-text  "
      id="ct-10" data-comment-id="3282460">Does anyone have a workaround for this issue? I am in shock that for one time in my life I have to redesign because of a bug in firefox not ie. How can I detect the issue because it occurs outside of a function and happens on focus to the textbox? Anyone? ANYONE? ok anyone?</div></div><div class="change-set" id="c11"><div class="comment" data-id="3282603" data-no="11"
       data-tags="">
    
    <table class="layout-table change-head " id="ch-11" role="presentation">
      <tr>
          <td rowspan="2" class="change-gravatar"><div class="vcard vcard_286152" id="a99810440_55600"><img src="extensions/Gravatar/web/default.jpg" class="gravatar" width="32" height="32">
</div>
          </td>

          <td class="change-author"><div class="vcard vcard_286152" id="a99810440_55600"><a class="email disabled" href="/user_profile?user_id=286152" > <span class="fna">ed</span></a>
</div>
          </td>

        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="cs-11"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>

      <tr id="cr-11" >
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#c11">Comment 11</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2007-08-16 11:30 PDT" data-time="1187289013">18 years ago</span>
          </div>
        </td>
      </tr>

      <tr id="ctag-11">
        <td colspan="2" class="comment-tags">
        </td>
      </tr>
    </table>

    
  </div><div
      class="comment-text  "
      id="ct-11" data-comment-id="3282603">(In reply to <a class="bz_bug_link
          bz_status_RESOLVED bz_closed"
   title="RESOLVED FIXED - &lt;input&gt;'s hidden DIV shows up as event.originalTarget in click events"
   href="/show_bug.cgi?id=208427#c9">comment #9</a>)
<span class="quote">&gt; Does anyone have a workaround for this issue? I am in shock that for one time
&gt; in my life I have to redesign because of a bug in firefox not ie. How can I
&gt; detect the issue because it occurs outside of a function and happens on focus
&gt; to the textbox? Anyone? ANYONE? ok anyone?
&gt; </span >
I wil start off by apologizing for the duplicate submission. Now let me clarify the issue I am talking about. The error is Permission denied to get property
HTMLDivElement.parentNode in firebug. This occurs when a user clicks on the text box of a form contained in a div element. The div is not anonymous. I am looking for a possible workaround. My questions are:
*How do I detect the error before displaying?
*Is there a possible way I may alter html to fix issue on my part?
*Why can't I access the related target?should I use .target to access?
*Should I add eventlistener to intercept eventTarget?

Once again sorry for the duplicate submission.


</div></div><div class="change-set" id="c12"><div class="comment" data-id="3298878" data-no="12"
       data-tags="">
    
    <table class="layout-table change-head " id="ch-12" role="presentation">
      <tr>
          <td rowspan="2" class="change-gravatar"><div class="vcard vcard_83891" id="a99810440_55600"><img src="extensions/Gravatar/web/default.jpg" class="gravatar" width="32" height="32">
</div>
          </td>

          <td class="change-author"><div class="vcard vcard_83891" id="a99810440_55600"><a class="email disabled" href="/user_profile?user_id=83891" > <span class="fna">Martin Gutjahr</span></a>
</div>
          </td>

        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="cs-12"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>

      <tr id="cr-12" >
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#c12">Comment 12</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2007-09-01 02:52 PDT" data-time="1188640366">18 years ago</span>
          </div>
        </td>
      </tr>

      <tr id="ctag-12">
        <td colspan="2" class="comment-tags">
        </td>
      </tr>
    </table>

    
  </div><div
      class="comment-text  "
      id="ct-12" data-comment-id="3298878">&#64;ed: I have the same here.
Workaround was to handle the access to parentNode in a try/catch-block
and loop max 5 times over ret=something.parentNode.
If ret is something useful, I exit the loop and return the result to 
my calling function. If after 5 times I still have no expected
result, I return an error-state.

</div></div><div class="change-set" id="c13"><div class="comment" data-id="3407079" data-no="13"
       data-tags="">
    
    <table class="layout-table change-head " id="ch-13" role="presentation">
      <tr>
          <td rowspan="2" class="change-gravatar"><div class="vcard vcard_295896" id="a99810440_55600"><img src="extensions/Gravatar/web/default.jpg" class="gravatar" width="32" height="32">
</div>
          </td>

          <td class="change-author"><div class="vcard vcard_295896" id="a99810440_55600"><a class="email disabled" href="/user_profile?user_id=295896" > <span class="fna">Negora</span></a>
</div>
          </td>

        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="cs-13"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>

      <tr id="cr-13" >
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#c13">Comment 13</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2007-12-14 02:26 PST" data-time="1197627977">18 years ago</span>
          </div>
        </td>
      </tr>

      <tr id="ctag-13">
        <td colspan="2" class="comment-tags">
        </td>
      </tr>
    </table>

    
  </div><div
      class="comment-text  "
      id="ct-13" data-comment-id="3407079">Wow, when I firstly saw the date of this bug ticket (2003) I thought that had already been fixed and that the bug which I was suffering was different, but &quot;fortunately&quot; this is the same.

Like somebody said before, it seems that form elements are wrapped by a non-visible and &quot;private&quot; DIV element. So, when you try to &quot;climb&quot; higher nodes it throws that exception.

Like Martin, my only way to &quot;avoid&quot; this problem has been to use a &quot;try/catch&quot; statement and, depending on the case, look for an alternative way to get the element which I needed.

I hope this has been fixed in version 3.</div></div><div class="change-set" id="c14"><div class="comment" data-id="3407135" data-no="14"
       data-tags="">
    
    <table class="layout-table change-head " id="ch-14" role="presentation">
      <tr>
          <td rowspan="2" class="change-gravatar"><div class="vcard vcard_39966" id="a99810440_55600"><img src="https://secure.gravatar.com/avatar/056757eff6ed7c8ec26f61e3bf7695fe?d=mm&size=64" class="gravatar" width="32" height="32">
</div>
          </td>

          <td class="change-author"><div class="vcard vcard_39966" id="a99810440_55600"><a class="email " href="/user_profile?user_id=39966" > <span class="fna">Olli Pettay [:smaug][bugs&#64;pettay.fi]</span></a>
</div>
          </td>

        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="cs-14"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>

      <tr id="cr-14" >
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#c14">Comment 14</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2007-12-14 03:39 PST" data-time="1197632388">18 years ago</span>
          </div>
        </td>
      </tr>

      <tr id="ctag-14">
        <td colspan="2" class="comment-tags">
        </td>
      </tr>
    </table>

    
  </div><div
      class="comment-text  "
      id="ct-14" data-comment-id="3407135">Normally one should use .target, not .originalTarget which is Mozilla only thing.</div></div><div class="change-set" id="c15"><div class="comment" data-id="3407396" data-no="15"
       data-tags="">
    
    <table class="layout-table change-head " id="ch-15" role="presentation">
      <tr>
          <td rowspan="2" class="change-gravatar"><div class="vcard vcard_295896" id="a99810440_55600"><img src="extensions/Gravatar/web/default.jpg" class="gravatar" width="32" height="32">
</div>
          </td>

          <td class="change-author"><div class="vcard vcard_295896" id="a99810440_55600"><a class="email disabled" href="/user_profile?user_id=295896" > <span class="fna">Negora</span></a>
</div>
          </td>

        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="cs-15"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>

      <tr id="cr-15" >
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#c15">Comment 15</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2007-12-14 09:14 PST" data-time="1197652499">18 years ago</span>
          </div>
        </td>
      </tr>

      <tr id="ctag-15">
        <td colspan="2" class="comment-tags">
        </td>
      </tr>
    </table>

    
  </div><div
      class="comment-text  "
      id="ct-15" data-comment-id="3407396">Well, in my case I was using &quot;relTarget&quot;.</div></div><div class="change-set" id="c16"><div class="comment" data-id="3407460" data-no="16"
       data-tags="">
    
    <table class="layout-table change-head " id="ch-16" role="presentation">
      <tr>
          <td rowspan="2" class="change-gravatar"><div class="vcard vcard_39966" id="a99810440_55600"><img src="https://secure.gravatar.com/avatar/056757eff6ed7c8ec26f61e3bf7695fe?d=mm&size=64" class="gravatar" width="32" height="32">
</div>
          </td>

          <td class="change-author"><div class="vcard vcard_39966" id="a99810440_55600"><a class="email " href="/user_profile?user_id=39966" > <span class="fna">Olli Pettay [:smaug][bugs&#64;pettay.fi]</span></a>
</div>
          </td>

        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="cs-16"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>

      <tr id="cr-16" >
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#c16">Comment 16</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2007-12-14 09:59 PST" data-time="1197655179">18 years ago</span>
          </div>
        </td>
      </tr>

      <tr id="ctag-16">
        <td colspan="2" class="comment-tags">
        </td>
      </tr>
    </table>

    
  </div><div
      class="comment-text  "
      id="ct-16" data-comment-id="3407460">You mean relatedTarget? This bug is about .originalTarget. If you have problems
with .relatedTarget, please test using the latest firefox 3 nightly build and
if the bug still exists, file a new bug and attach a *minimal* testcase.</div></div><div class="change-set" id="c17"><div class="comment" data-id="3407655" data-no="17"
       data-tags="">
    
    <table class="layout-table change-head " id="ch-17" role="presentation">
      <tr>
          <td rowspan="2" class="change-gravatar"><div class="vcard vcard_295896" id="a99810440_55600"><img src="extensions/Gravatar/web/default.jpg" class="gravatar" width="32" height="32">
</div>
          </td>

          <td class="change-author"><div class="vcard vcard_295896" id="a99810440_55600"><a class="email disabled" href="/user_profile?user_id=295896" > <span class="fna">Negora</span></a>
</div>
          </td>

        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="cs-17"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>

      <tr id="cr-17" >
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#c17">Comment 17</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2007-12-14 12:37 PST" data-time="1197664648">18 years ago</span>
          </div>
        </td>
      </tr>

      <tr id="ctag-17">
        <td colspan="2" class="comment-tags">
        </td>
      </tr>
    </table>

    
  </div><div
      class="comment-text  "
      id="ct-17" data-comment-id="3407655">Ok, excuse me.</div></div><div class="change-set" id="a155317943_39966"><div class="change" id="aa155317943_39966">
    <table class="layout-table change-head " role="presentation">
      <tr>
        <td rowspan="2" class="change-gravatar"><div class="vcard vcard_39966" id="a155317943_39966"><img src="https://secure.gravatar.com/avatar/056757eff6ed7c8ec26f61e3bf7695fe?d=mm&size=64" class="gravatar" width="32" height="32">
</div>
        </td>
        <td class="change-author"><div class="vcard vcard_39966" id="a155317943_39966"><a class="email " href="/user_profile?user_id=39966" > <span class="fna">Olli Pettay [:smaug][bugs&#64;pettay.fi]</span></a>
</div>
        </td>
        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="as-a155317943_39966"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>
      <tr id="ar-a155317943_39966">
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#a155317943_39966">Updated</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2008-05-07 01:21 PDT" data-time="1210148500">18 years ago</span>
          </div>
        </td>
      </tr>
    </table>
  </div><div class="activity"><div class="change">Depends on: <a class="bz_bug_link
          bz_status_NEW"
   title="NEW - Make it impossible for untrusted JS to get access to native anonymous content"
   href="/show_bug.cgi?id=432586">432586</a></div></div></div><div class="change-set" id="c18"><div class="comment" data-id="3729194" data-no="18"
       data-tags="">
    
    <table class="layout-table change-head " id="ch-18" role="presentation">
      <tr>
          <td rowspan="2" class="change-gravatar"><div class="vcard vcard_221" id="a155317943_39966"><img src="https://secure.gravatar.com/avatar/d7535398322ea87021a045d03b16b03f?d=mm&size=64" class="gravatar" width="32" height="32">
</div>
          </td>

          <td class="change-author"><div class="vcard vcard_221" id="a155317943_39966"><a class="email " href="/user_profile?user_id=221" > <span class="fna">Alessandro Vernet</span></a>
</div>
          </td>

        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="cs-18"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>

      <tr id="cr-18" >
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#c18">Comment 18</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2008-08-05 14:47 PDT" data-time="1217972864">17 years ago</span>
          </div>
        </td>
      </tr>

      <tr id="ctag-18">
        <td colspan="2" class="comment-tags">
        </td>
      </tr>
    </table>

    
  </div><div
      class="comment-text  "
      id="ct-18" data-comment-id="3729194">(In reply to <a class="bz_bug_link
          bz_status_RESOLVED bz_closed"
   title="RESOLVED FIXED - &lt;input&gt;'s hidden DIV shows up as event.originalTarget in click events"
   href="/show_bug.cgi?id=208427#c12">comment #12</a>)
<span class="quote">&gt; Workaround was to handle the access to parentNode in a try/catch-block
&gt; and loop max 5 times over ret=something.parentNode.
&gt; If ret is something useful, I exit the loop and return the result to 
&gt; my calling function. If after 5 times I still have no expected
&gt; result, I return an error-state.</span >

I am wondering why you would need to loop 5 times. Is there any chance that subsequent call to something.parentNode succeed if a previous call failed?</div></div><div class="change-set" id="a179114270_297995"><div class="change" id="aa179114270_297995">
    <table class="layout-table change-head " role="presentation">
      <tr>
        <td rowspan="2" class="change-gravatar"><div class="vcard vcard_297995" id="a179114270_297995"><img src="https://secure.gravatar.com/avatar/b9095cdfa274d5bcc1aec8671313c172?d=mm&size=64" class="gravatar" width="32" height="32">
</div>
        </td>
        <td class="change-author"><div class="vcard vcard_297995" id="a179114270_297995"><a class="email " href="/user_profile?user_id=297995" > <span class="fna">Nochum Sossonko [:Natch]</span></a>
</div>
        </td>
        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="as-a179114270_297995"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>
      <tr id="ar-a179114270_297995">
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#a179114270_297995">Updated</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2009-02-06 10:27 PST" data-time="1233944827">17 years ago</span>
          </div>
        </td>
      </tr>
    </table>
  </div><div class="activity"><div class="change">Assignee: saari &rarr; nobody</div><div class="change">QA Contact: desale &rarr; events</div></div></div><div class="change-set" id="c19"><div class="comment" data-id="4209434" data-no="19"
       data-tags="">
    
    <table class="layout-table change-head " id="ch-19" role="presentation">
      <tr>
          <td rowspan="2" class="change-gravatar"><div class="vcard vcard_223726" id="a179114270_297995"><img src="extensions/Gravatar/web/default.jpg" class="gravatar" width="32" height="32">
</div>
          </td>

          <td class="change-author"><div class="vcard vcard_223726" id="a179114270_297995"><a class="email disabled" href="/user_profile?user_id=223726" > <span class="fna">John J. Barton</span></a>
</div>
          </td>

        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="cs-19"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>

      <tr id="cr-19" >
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#c19">Comment 19</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2009-07-21 20:17 PDT" data-time="1248232634">16 years ago</span>
          </div>
        </td>
      </tr>

      <tr id="ctag-19">
        <td colspan="2" class="comment-tags">
        </td>
      </tr>
    </table>

    
  </div><div
      class="comment-text  "
      id="ct-19" data-comment-id="4209434">I am posting here based on <a target="_blank" rel="nofollow noreferrer" href="http://code.google.com/p/fbug/issues/detail?id=2075">http://code.google.com/p/fbug/issues/detail?id=2075</a>.
The arguments made there make sense to me.

&quot;... the comments to pay attention to are #2 and #3.
originalTarget was a symptom (and a red herring). Internal div elements that Fx
manages should not be sent back to user space. Generally this is the case, but not so in some circumstances with the INPUT element.&quot;

Here is evidence that this problem causes workarounds in major javascript libraries, an area we should be leaving to IE:

(all quoted from the firebug report)
ExtJS
-----
ExtJS (which I use) does not have a good bug list, so here is a search on their forums:
<a target="_blank" rel="nofollow noreferrer" href="http://www.google.com/#hl=en&amp;q=site%3Aextjs.com+permission+denied+non-chrome+context&amp;aq=f&amp;oq=&amp;aqi=&amp;fp=Xmf0jJ9P_V0">http://www.google.com/#hl=en&amp;q=site%3Aextjs.com+permission+denied+non-chrome+context&amp;aq=f&amp;oq=&amp;aqi=&amp;fp=Xmf0jJ9P_V0</a>

They use the try/catch workaround in the function isTextNode() to get around it,
though they need that solution in other parts of their code as well (despite what
Firebug does, since this error still needs to be handled/ignored to prevent code from
stopping).

Also in ext-base-event.js they make explicit reference to it:
 function elContains(parent, child) {
...
92 	                // In FF if you mouseout an text input element
93 	                // thats inside a div sometimes it randomly throws
94 	                // Permission denied to get property HTMLDivElement.parentNode
95 	                // See <a class="bz_bug_link
          bz_status_RESOLVED bz_closed"
   title="RESOLVED FIXED - &lt;input&gt;'s hidden DIV shows up as event.originalTarget in click events"
   href="/show_bug.cgi?id=208427">https://bugzilla.mozilla.org/show_bug.cgi?id=208427</a>


mochikit
--------

From:
<a target="_blank" rel="nofollow noreferrer" href="http://trac.mochikit.com/changeset/1089">http://trac.mochikit.com/changeset/1089</a>

 	549	            try { 
 	550	                e.relatedTarget().nodeName; 
 	551	            } catch (err) { 
 	552	                /* probably hit a permission denied error; possibly one of 
 	553	                 * firefox's screwy anonymous DIVs inside an input element. 
 	554	                 * Allow this event to propogate up. 
 	555	                 */ 
 	556	                return; 
 	557	            } 


jQuery
------
They use the same technique in the function withinElement, etc. There dev site is
currently down, but when it returns look at ticket #222 from three years ago.


GWT
---
<a target="_blank" rel="nofollow noreferrer" href="http://code.google.com/p/google-web-toolkit/issues/detail?id=671">http://code.google.com/p/google-web-toolkit/issues/detail?id=671</a>
<a target="_blank" rel="nofollow noreferrer" href="http://code.google.com/p/google-web-toolkit/issues/detail?id=638">http://code.google.com/p/google-web-toolkit/issues/detail?id=638</a>
<a target="_blank" rel="nofollow noreferrer" href="http://code.google.com/p/google-web-toolkit/issues/detail?id=243">http://code.google.com/p/google-web-toolkit/issues/detail?id=243</a>
<a target="_blank" rel="nofollow noreferrer" href="http://code.google.com/p/google-web-toolkit/issues/detail?id=1909">http://code.google.com/p/google-web-toolkit/issues/detail?id=1909</a>



Other links:
<a target="_blank" rel="nofollow noreferrer" href="http://kendsnyder.com/archives/6-MouseEnter-and-MouseLeave.html">http://kendsnyder.com/archives/6-MouseEnter-and-MouseLeave.html</a></div><div class="activity"><div class="change">Whiteboard: [firebug-p3]</div></div></div><div class="change-set" id="c20"><div class="comment" data-id="4210233" data-no="20"
       data-tags="">
    
    <table class="layout-table change-head " id="ch-20" role="presentation">
      <tr>
          <td rowspan="2" class="change-gravatar"><div class="vcard vcard_39966" id="a179114270_297995"><img src="https://secure.gravatar.com/avatar/056757eff6ed7c8ec26f61e3bf7695fe?d=mm&size=64" class="gravatar" width="32" height="32">
</div>
          </td>

          <td class="change-author"><div class="vcard vcard_39966" id="a179114270_297995"><a class="email " href="/user_profile?user_id=39966" > <span class="fna">Olli Pettay [:smaug][bugs&#64;pettay.fi]</span></a>
</div>
          </td>

        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="cs-20"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>

      <tr id="cr-20" >
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#c20">Comment 20</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2009-07-22 07:11 PDT" data-time="1248271906">16 years ago</span>
          </div>
        </td>
      </tr>

      <tr id="ctag-20">
        <td colspan="2" class="comment-tags">
        </td>
      </tr>
    </table>

    
  </div><div
      class="comment-text  "
      id="ct-20" data-comment-id="4210233">Why is any web script using .originalTarget?
And <a class="bz_bug_link
          bz_status_RESOLVED bz_closed"
   title="RESOLVED FIXED - &lt;input&gt;'s hidden DIV shows up as event.originalTarget in click events"
   href="/show_bug.cgi?id=208427#c16">https://bugzilla.mozilla.org/show_bug.cgi?id=208427#c16</a></div></div><div class="change-set" id="c21"><div class="comment" data-id="4210269" data-no="21"
       data-tags="">
    
    <table class="layout-table change-head " id="ch-21" role="presentation">
      <tr>
          <td rowspan="2" class="change-gravatar"><div class="vcard vcard_306589" id="a179114270_297995"><img src="https://secure.gravatar.com/avatar/57e0f363d82b32e38808ab5fe67a6f14?d=mm&size=64" class="gravatar" width="32" height="32">
</div>
          </td>

          <td class="change-author"><div class="vcard vcard_306589" id="a179114270_297995"><a class="email " href="/user_profile?user_id=306589" > <span class="fna">Steve Roussey (:sroussey)</span></a>
</div>
          </td>

        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="cs-21"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>

      <tr id="cr-21" >
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#c21">Comment 21</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2009-07-22 07:30 PDT" data-time="1248273042">16 years ago</span>
          </div>
        </td>
      </tr>

      <tr id="ctag-21">
        <td colspan="2" class="comment-tags">
        </td>
      </tr>
    </table>

    
  </div><div
      class="comment-text  "
      id="ct-21" data-comment-id="4210269">It just happens to be *any* property, both existing and nonexistent: originalTarget, relatedTarget, parentNode, xyz, asdf. Since Fx returns the anonymous div [HTMLDivElement] inside the input on the event and not the input itself [HTMLInputElement], doing anything with it causes the permission error.

I did a search of ExtJS for example, and found no reference to originalTarget.

PS: I think the error is confined to the mouseout event for the text input element.</div></div><div class="change-set" id="c22"><div class="comment" data-id="4210299" data-no="22"
       data-tags="">
    
    <table class="layout-table change-head " id="ch-22" role="presentation">
      <tr>
          <td rowspan="2" class="change-gravatar"><div class="vcard vcard_39966" id="a179114270_297995"><img src="https://secure.gravatar.com/avatar/056757eff6ed7c8ec26f61e3bf7695fe?d=mm&size=64" class="gravatar" width="32" height="32">
</div>
          </td>

          <td class="change-author"><div class="vcard vcard_39966" id="a179114270_297995"><a class="email " href="/user_profile?user_id=39966" > <span class="fna">Olli Pettay [:smaug][bugs&#64;pettay.fi]</span></a>
</div>
          </td>

        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="cs-22"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>

      <tr id="cr-22" >
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#c22">Comment 22</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2009-07-22 07:42 PDT" data-time="1248273754">16 years ago</span>
          </div>
        </td>
      </tr>

      <tr id="ctag-22">
        <td colspan="2" class="comment-tags">
        </td>
      </tr>
    </table>

    
  </div><div
      class="comment-text  "
      id="ct-22" data-comment-id="4210299">event.target is not the anonymous node when content scripts access the event.

This bug is about event.originalTarget, which is Mozilla only feature and
shouldn't be used in the web, IMHO.

If .relatedTarget points to an anonymous node, that is a different bug (already filed).</div></div><div class="change-set" id="c23"><div class="comment" data-id="4210309" data-no="23"
       data-tags="">
    
    <table class="layout-table change-head " id="ch-23" role="presentation">
      <tr>
          <td rowspan="2" class="change-gravatar"><div class="vcard vcard_306589" id="a179114270_297995"><img src="https://secure.gravatar.com/avatar/57e0f363d82b32e38808ab5fe67a6f14?d=mm&size=64" class="gravatar" width="32" height="32">
</div>
          </td>

          <td class="change-author"><div class="vcard vcard_306589" id="a179114270_297995"><a class="email " href="/user_profile?user_id=306589" > <span class="fna">Steve Roussey (:sroussey)</span></a>
</div>
          </td>

        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="cs-23"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>

      <tr id="cr-23" >
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#c23">Comment 23</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2009-07-22 07:46 PDT" data-time="1248274017">16 years ago</span>
          </div>
        </td>
      </tr>

      <tr id="ctag-23">
        <td colspan="2" class="comment-tags">
        </td>
      </tr>
    </table>

    
  </div><div
      class="comment-text  "
      id="ct-23" data-comment-id="4210309">It was filed but marked as a duplicate. Though I could be missing another bugzilla ID...

<a class="bz_bug_link
          bz_status_RESOLVED bz_closed"
   title="RESOLVED DUPLICATE - Error: uncaught exception: Permission denied to get property HTMLDivElement.parentNode"
   href="/show_bug.cgi?id=214340#c1">https://bugzilla.mozilla.org/show_bug.cgi?id=214340#c1</a></div></div><div class="change-set" id="c24"><div class="comment" data-id="4210356" data-no="24"
       data-tags="">
    
    <table class="layout-table change-head " id="ch-24" role="presentation">
      <tr>
          <td rowspan="2" class="change-gravatar"><div class="vcard vcard_306589" id="a179114270_297995"><img src="https://secure.gravatar.com/avatar/57e0f363d82b32e38808ab5fe67a6f14?d=mm&size=64" class="gravatar" width="32" height="32">
</div>
          </td>

          <td class="change-author"><div class="vcard vcard_306589" id="a179114270_297995"><a class="email " href="/user_profile?user_id=306589" > <span class="fna">Steve Roussey (:sroussey)</span></a>
</div>
          </td>

        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="cs-24"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>

      <tr id="cr-24" >
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#c24">Comment 24</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2009-07-22 08:01 PDT" data-time="1248274872">16 years ago</span>
          </div>
        </td>
      </tr>

      <tr id="ctag-24">
        <td colspan="2" class="comment-tags">
        </td>
      </tr>
    </table>

    
  </div><div
      class="comment-text  "
      id="ct-24" data-comment-id="4210356">This is not the same as <a class="bz_bug_link
          bz_status_RESOLVED bz_closed"
   title="RESOLVED FIXED - onmouseout's MouseEvent.relatedTarget is a chrome element and is completely inaccessible."
   href="/show_bug.cgi?id=497780">https://bugzilla.mozilla.org/show_bug.cgi?id=497780</a>, btw. If I remember right, in that case if you called Object.prototype.toString.call(node) == '[object XULElement]'. But in this case it is '[object HTMLDivElement]' as referenced in the original post.</div></div><div class="change-set" id="c25"><div class="comment" data-id="4210362" data-no="25"
       data-tags="">
    
    <table class="layout-table change-head " id="ch-25" role="presentation">
      <tr>
          <td rowspan="2" class="change-gravatar"><div class="vcard vcard_306589" id="a179114270_297995"><img src="https://secure.gravatar.com/avatar/57e0f363d82b32e38808ab5fe67a6f14?d=mm&size=64" class="gravatar" width="32" height="32">
</div>
          </td>

          <td class="change-author"><div class="vcard vcard_306589" id="a179114270_297995"><a class="email " href="/user_profile?user_id=306589" > <span class="fna">Steve Roussey (:sroussey)</span></a>
</div>
          </td>

        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="cs-25"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>

      <tr id="cr-25" >
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#c25">Comment 25</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2009-07-22 08:04 PDT" data-time="1248275068">16 years ago</span>
          </div>
        </td>
      </tr>

      <tr id="ctag-25">
        <td colspan="2" class="comment-tags">
        </td>
      </tr>
    </table>

    
  </div><div
      class="comment-text  "
      id="ct-25" data-comment-id="4210362">Here is some of the ExtJS code that checks for the XUL bug and for the the old bug we are talking about here (the use of the try/catch around the nodeType and parentNode):

    var isXUL = Ext.isGecko ? function(node){ 
        return Object.prototype.toString.call(node) == '[object XULElement]';
    } : function(){};
        
    var isTextNode = Ext.isGecko ? function(node){
        try{
            return node.nodeType == 3;
        }catch(e) {
            return false;
        }

    } : function(node){
        return node.nodeType == 3;
    };
        
    function checkRelatedTarget(e) {
        var related = pub.getRelatedTarget(e);
        return !(isXUL(related) || elContains(e.currentTarget,related));
    }

    function elContains(parent, child) {
       if(parent &amp;&amp; parent.firstChild){  
         while(child) {
            if(child === parent) {
                return true;
            }
            try {
                child = child.parentNode;
            } catch(e) {
                // In FF if you mouseout an text input element
                // thats inside a div sometimes it randomly throws
                // Permission denied to get property HTMLDivElement.parentNode
                // See <a class="bz_bug_link
          bz_status_RESOLVED bz_closed"
   title="RESOLVED FIXED - &lt;input&gt;'s hidden DIV shows up as event.originalTarget in click events"
   href="/show_bug.cgi?id=208427">https://bugzilla.mozilla.org/show_bug.cgi?id=208427</a>
                
                return false;
            }                
            if(child &amp;&amp; (child.nodeType != 1)) {
                child = null;
            }
          }
        }
        return false;
    }

Example:
<a target="_blank" rel="nofollow noreferrer" href="http://extjs.com/deploy/dev/examples/menu/menus.html">http://extjs.com/deploy/dev/examples/menu/menus.html</a>

Just move the mouse back and forth (quickly!) over all the buttons (be
sure to include the textfield in there). 

With break on errors set, it will stop in Firebug when trying to access
properties on the Firefox inserted div inside an input element.</div></div><div class="change-set" id="c26"><div class="comment" data-id="4211237" data-no="26"
       data-tags="">
    
    <table class="layout-table change-head " id="ch-26" role="presentation">
      <tr>
          <td rowspan="2" class="change-gravatar"><div class="vcard vcard_306589" id="a179114270_297995"><img src="https://secure.gravatar.com/avatar/57e0f363d82b32e38808ab5fe67a6f14?d=mm&size=64" class="gravatar" width="32" height="32">
</div>
          </td>

          <td class="change-author"><div class="vcard vcard_306589" id="a179114270_297995"><a class="email " href="/user_profile?user_id=306589" > <span class="fna">Steve Roussey (:sroussey)</span></a>
</div>
          </td>

        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="cs-26"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>

      <tr id="cr-26" >
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#c26">Comment 26</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2009-07-22 14:26 PDT" data-time="1248297998">16 years ago</span>
          </div>
        </td>
      </tr>

      <tr id="ctag-26">
        <td colspan="2" class="comment-tags">
        </td>
      </tr>
    </table>

    
  </div><div
      class="comment-text  "
      id="ct-26" data-comment-id="4211237">Some more checking. relatedTarget does seem to be the cause of my test cases. Here is a simple one:

&lt;html&gt;
&lt;body &gt;
	&lt;div id=&quot;joe&quot; style=&quot;background-color:red&quot;&gt;
		&lt;img src=&quot;<a target="_blank" rel="nofollow noreferrer" href="http://cf.staticac.com/blank.gif">http://cf.staticac.com/blank.gif</a>&quot; height=&quot;40&quot; width=&quot;100&quot;/&gt;
	&lt;/div&gt;
	&lt;div id=&quot;tom&quot;&gt;
		&lt;input id=&quot;chris&quot;/&gt;
	&lt;/div&gt;
&lt;/body&gt;
&lt;script&gt;
	var s=document.getElementById('joe');
	s.addEventListener('mouseout',function(e){var t=e.relatedTarget.nodeType;},document)
&lt;/script&gt;
&lt;/html&gt;


The earliest bug for this from 2001:
<a class="bz_bug_link
          bz_status_RESOLVED bz_closed"
   title="RESOLVED FIXED - HTMLTextAreaElement seems to contain HTMLDivElement (wrong event.relatedTarget)"
   href="/show_bug.cgi?id=101197">https://bugzilla.mozilla.org/show_bug.cgi?id=101197</a>

This might be related:
<a class="bz_bug_link
          bz_status_UNCONFIRMED"
   title="UNCONFIRMED - mouseOver &amp; mouseUp from/to option elements within select generate spurious events with bad relatedTargets"
   href="/show_bug.cgi?id=382735">https://bugzilla.mozilla.org/show_bug.cgi?id=382735</a></div></div><div class="change-set" id="c27"><div class="comment" data-id="7892276" data-no="27"
       data-tags="">
    
    <table class="layout-table change-head " id="ch-27" role="presentation">
      <tr>
          <td rowspan="2" class="change-gravatar"><div class="vcard vcard_312604" id="a179114270_297995"><img src="https://secure.gravatar.com/avatar/f5d8cf5503f850346e2fc98a8736bfa3?d=mm&size=64" class="gravatar" width="32" height="32">
</div>
          </td>

          <td class="change-author"><div class="vcard vcard_312604" id="a179114270_297995"><a class="email " href="/user_profile?user_id=312604" > <span class="fna">Ufku</span></a>
</div>
          </td>

        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="cs-27"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>

      <tr id="cr-27" >
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#c27">Comment 27</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2013-09-23 14:06 PDT" data-time="1379970376">12 years ago</span>
          </div>
        </td>
      </tr>

      <tr id="ctag-27">
        <td colspan="2" class="comment-tags">
        </td>
      </tr>
    </table>

    
  </div><div
      class="comment-text  "
      id="ct-27" data-comment-id="7892276">Anonymous div alsıo ruins dragenter/dragleave events of textareas. Is there a workaround to fix this?</div></div><div class="change-set" id="a474978698_609492"><div class="change" id="aa474978698_609492">
    <table class="layout-table change-head " role="presentation">
      <tr>
        <td rowspan="2" class="change-gravatar"><div class="vcard vcard_609492" id="a474978698_609492"><img src="extensions/Gravatar/web/default.jpg" class="gravatar" width="32" height="32">
</div>
        </td>
        <td class="change-author"><div class="vcard vcard_609492" id="a474978698_609492"><a class="email disabled" href="/user_profile?user_id=609492" > <span class="fna">Marion Daly [:mdaly]</span></a>
</div>
        </td>
        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="as-a474978698_609492"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>
      <tr id="ar-a474978698_609492">
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#a474978698_609492">Updated</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2018-06-23 20:00 PDT" data-time="1529809255">8 years ago</span>
          </div>
        </td>
      </tr>
    </table>
  </div><div class="activity"><div class="change">Priority: -- &rarr; P5</div></div></div><div class="change-set" id="a610605736_546015"><div class="change" id="aa610605736_546015">
    <table class="layout-table change-head " role="presentation">
      <tr>
        <td rowspan="2" class="change-gravatar"><div class="vcard vcard_546015" id="a610605736_546015"><img src="https://secure.gravatar.com/avatar/d0465b8931b44330f542efbeeae855da?d=mm&size=64" class="gravatar" width="32" height="32">
</div>
        </td>
        <td class="change-author"><div class="vcard vcard_546015" id="a610605736_546015"><a class="email " href="/user_profile?user_id=546015" > <span class="fna">BMO Automation</span></a>
</div>
        </td>
        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="as-a610605736_546015"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>
      <tr id="ar-a610605736_546015">
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#a610605736_546015">Updated</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2022-10-10 14:11 PDT" data-time="1665436293">3 years ago</span>
          </div>
        </td>
      </tr>
    </table>
  </div><div class="activity"><div class="change">Severity: normal &rarr; S3</div></div></div><div class="change-set" id="c29"><div class="comment" data-id="17836067" data-no="29"
       data-tags="">
    
    <table class="layout-table change-head assignee" id="ch-29" role="presentation">
      <tr>
          <td rowspan="2" class="change-gravatar"><div class="vcard vcard_685138" id="a610605736_546015"><img src="https://secure.gravatar.com/avatar/6a80b118ba6712afa619c3864bbd2996?d=mm&size=64" class="gravatar" width="32" height="32">
</div>
          </td>

          <td class="change-author"><div class="vcard vcard_685138" id="a610605736_546015"><a class="email " href="/user_profile?user_id=685138" > <span class="fna">Gregory Pappas [:gregp]</span></a>
</div>
              <span class="user-role">Assignee</span>
          </td>

        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="cs-29"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>

      <tr id="cr-29" >
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#c29">Comment 29</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2026-01-09 16:04 PST" data-time="1768003491">6 months ago</span>
          </div>
        </td>
      </tr>

      <tr id="ctag-29">
        <td colspan="2" class="comment-tags">
        </td>
      </tr>
    </table>

    
  </div><div id="att-9536762"
         class="attachment"
         data-id="9536762" itemscope itemtype="http://schema.org/MediaObject">
      <meta itemprop="name" content="phabricator-D278560-url.txt">
      <meta itemprop="contentSize" content="48">
      <meta itemprop="encodingFormat" content="text/x-phabricator-request">
      <div class="label">
        Attached file
          <a class="link" href="attachment.cgi?id=9536762" itemprop="contentUrl" >
        <span id="att-9536762-description" itemprop="description">Bug 208427 - Retarget originalTarget to closest non-NAC when caller is not chrome</span></a>
        — <a href="attachment.cgi?id=9536762&amp;action=edit" itemprop="url" data-details="1">Details</a>
      </div>
    </div>

  <div
      class="comment-text markdown-body empty"
      id="ct-29" data-comment-id="17836067"></div></div><div class="change-set" id="a713172934_600971"><div class="change" id="aa713172934_600971">
    <table class="layout-table change-head " role="presentation">
      <tr>
        <td rowspan="2" class="change-gravatar"><div class="vcard vcard_600971" id="a713172934_600971"><img src="https://secure.gravatar.com/avatar/a088418052679d9583556d277e6774ee?d=mm&size=64" class="gravatar" width="32" height="32">
</div>
        </td>
        <td class="change-author"><div class="vcard vcard_600971" id="a713172934_600971"><a class="email " href="/user_profile?user_id=600971" > <span class="fna">Phabricator Automation</span></a>
</div>
        </td>
        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="as-a713172934_600971"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>
      <tr id="ar-a713172934_600971">
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#a713172934_600971">Updated</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2026-01-09 16:04 PST" data-time="1768003491">6 months ago</span>
          </div>
        </td>
      </tr>
    </table>
  </div><div class="activity"><div class="change">Assignee: nobody &rarr; gp3033</div><div class="change">Status: NEW &rarr; ASSIGNED</div></div></div><div class="change-set" id="c30"><div class="comment" data-id="17836306" data-no="30"
       data-tags="">
    
    <table class="layout-table change-head " id="ch-30" role="presentation">
      <tr>
          <td rowspan="2" class="change-gravatar"><div class="vcard vcard_510726" id="a713172934_600971"><img src="https://secure.gravatar.com/avatar/a9d6ca739b340c670a0fecbd2c36f516?d=mm&size=64" class="gravatar" width="32" height="32">
</div>
          </td>

          <td class="change-author"><div class="vcard vcard_510726" id="a713172934_600971"><a class="email " href="/user_profile?user_id=510726" > <span class="fna">Pulsebot</span></a>
</div>
          </td>

        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="cs-30"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>

      <tr id="cr-30" >
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#c30">Comment 30</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2026-01-10 11:49 PST" data-time="1768074561">6 months ago</span>
          </div>
        </td>
      </tr>

      <tr id="ctag-30">
        <td colspan="2" class="comment-tags">
        </td>
      </tr>
    </table>

    
  </div><div
      class="comment-text  "
      id="ct-30" data-comment-id="17836306">Pushed by <a href="mailto:gp3033&#64;protonmail.com">gp3033&#64;protonmail.com</a>:
<a target="_blank" rel="nofollow noreferrer" href="https://github.com/mozilla-firefox/firefox/commit/64a19d6e96aa">https://github.com/mozilla-firefox/firefox/commit/64a19d6e96aa</a>
<a target="_blank" rel="nofollow noreferrer" href="https://hg.mozilla.org/integration/autoland/rev/395b1f5ade45">https://hg.mozilla.org/integration/autoland/rev/395b1f5ade45</a>
Retarget originalTarget to closest non-NAC when caller is not chrome r=smaug,webidl</div></div><div class="change-set" id="c31"><div class="comment" data-id="17836321" data-no="31"
       data-tags="bugherder">
    
    <table class="layout-table change-head " id="ch-31" role="presentation">
      <tr>
          <td rowspan="2" class="change-gravatar"><div class="vcard vcard_682863" id="a713172934_600971"><img src="https://secure.gravatar.com/avatar/348b805af88f773829064778b66be468?d=mm&size=64" class="gravatar" width="32" height="32">
</div>
          </td>

          <td class="change-author"><div class="vcard vcard_682863" id="a713172934_600971"><a class="email " href="/user_profile?user_id=682863" > <span class="fna">Iulian Moraru</span></a>
</div>
          </td>

        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="cs-31"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>

      <tr id="cr-31" >
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#c31">Comment 31</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2026-01-10 13:56 PST" data-time="1768082160">6 months ago</span>
          </div>
        </td>
      </tr>

      <tr id="ctag-31">
        <td colspan="2" class="comment-tags"><span class="comment-tag" data-tag="bugherder">bugherder
  </span>
        </td>
      </tr>
    </table>

    
  </div><div
      class="comment-text markdown-body "
      id="ct-31" data-comment-id="17836321"><p><a href="https://hg.mozilla.org/mozilla-central/rev/395b1f5ade45" rel="nofollow noreferrer" target="_blank">https://hg.mozilla.org/mozilla-central/rev/395b1f5ade45</a></p>
</div><div class="activity"><div class="change">Status: ASSIGNED &rarr; RESOLVED</div><div class="change">Closed: <span class="rel-time" title="2026-01-10 13:56 PST" data-time="1768082160">6 months ago</span></div><div class="change">
          <a href="/buglist.cgi?f1=cf_status_firefox148&amp;o1=isnotempty">status-firefox148</a>:
          --- &rarr; <a href="/buglist.cgi?f1=cf_status_firefox148&amp;o1=equals&amp;v1=fixed">fixed</a></div><div class="change">Resolution: --- &rarr; FIXED</div><div class="change">Target Milestone: --- &rarr; 148 Branch</div></div></div><div class="change-set" id="a713460794_500622"><div class="change" id="aa713460794_500622">
    <table class="layout-table change-head " role="presentation">
      <tr>
        <td rowspan="2" class="change-gravatar"><div class="vcard vcard_500622" id="a713460794_500622"><img src="https://secure.gravatar.com/avatar/06ec966e145ed13855a0650c379948dd?d=mm&size=64" class="gravatar" width="32" height="32">
</div>
        </td>
        <td class="change-author"><div class="vcard vcard_500622" id="a713460794_500622"><a class="email " href="/user_profile?user_id=500622" > <span class="fna">Camelia Badau [:cbadau], Desktop Test Engineering</span></a>
</div>
        </td>
        <td rowspan="2" class="comment-actions"><div role="group">
          <button type="button" class="change-spinner ghost iconic" id="as-a713460794_500622"
                  aria-label="Collapse" aria-expanded="true"
                  data-strings='{ "collapse_label": "Collapse", "expand_label": "Expanded" }'>
            <span class="icon" aria-hidden="true"></span>
          </button>
        </div></td>
      </tr>
      <tr id="ar-a713460794_500622">
        <td>
          <h3 class="change-name">
            <a href="/show_bug.cgi?id=208427#a713460794_500622">Updated</a>
          </h3>
          &bull;
          <div class="change-time"><span class="rel-time" title="2026-01-13 00:02 PST" data-time="1768291351">6 months ago</span>
          </div>
        </td>
      </tr>
    </table>
  </div><div class="activity"><div class="change">QA Whiteboard: [qa-triage-done-c149/b148]</div></div></div><div id="new-comment-notice">
          You need to <a href="/show_bug.cgi?id=208427&amp;GoAheadAndLogIn=1">log in</a>
          before you can comment on or make changes to this bug.
        </div>



<div id="bottom-actions">
  <div id="bottom-right-actions">
    <button type="button" id="top-btn" class="secondary" aria-label="Go to Page Top">Top &uarr;</button>
  </div>
</div>



<dialog id="att-overlay" class="readonly"
        aria-labelledby="att-overlay-title" data-attachment-count="1">
  <form method="dialog">
    <div class="header">
      <h2 id="att-overlay-title" class="title">Attachment</h2>
      <div class="spacer"></div>
      <button type="button" class="secondary iconic" hidden disabled data-action="prev"
              title="Previous Attachment" aria-keyshortcuts="ArrowLeft">
        <span class="icon" aria-hidden="true"></span>
      </button>
      <button type="button" class="secondary iconic" hidden disabled data-action="next"
              title="Next Attachment" aria-keyshortcuts="ArrowRight">
        <span class="icon" aria-hidden="true"></span>
      </button>
      <button type="button" class="secondary" data-action="toggle-details">Hide Details</button>
      <button type="button" class="secondary iconic" data-action="close" aria-label="Close">
        <span class="icon" aria-hidden="true"></span>
      </button>
    </div>
    <div class="body">
      <div class="sub-column">
        <div class="detail-pane">
          <section class="cols">
            <h3>General</h3>
            <div class="creator">
              Creator: <div class="vcard vcard_685138" ><a class="email " href="/user_profile?user_id=685138" > <span class="fna">Gregory Pappas [:gregp]</span></a>
</div>
            </div>
            <div>Created: <span class="created-date rel-time"></span></div>
            <div>Updated: <span class="updated-date rel-time"></span></div>
            <div>Size: <span class="file-size"></span></div>
          </section>
          <section class="cols">
            <h3>
              <label for="att-overlay-description">Description</label>
            </h3>
            <div>
              <input type="text" name="description" disabled
                     id="att-overlay-description" class="flex">
            </div>
          </section>
          <section class="cols">
            <h3>
              <label for="att-overlay-file-name">File Name</label>
            </h3>
            <div>
              <input type="text" name="filename" disabled
                     id="att-overlay-file-name" class="flex">
            </div>
          </section>
          <section class="cols">
            <h3>
              <label for="att-overlay-content-type">Content Type</label>
            </h3>
              <div>
                <input type="text" name="contenttypeentry" disabled id="att-overlay-content-type"
                       class="flex">
              </div>
          </section>
          
        </div>
      </div>
      <div class="main-column">
        <div class="preview-pane">
          <div class="preview ">
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <button type="button" class="secondary" data-action="raw">Raw</button>
        <button type="button" class="secondary" disabled data-action="diff">Diff</button>
        <button type="button" class="secondary" disabled data-action="review"
                data-base="https://bugzilla.mozilla.org/page.cgi?id=splinter.html&amp;ignore=">Splinter Review</button>
      <div class="spacer"></div>
    </div>
  </form>
</dialog>
<link rel="stylesheet" href="/static/v20260714.1/extensions/FlagTypeComment/web/styles/ftc.css">
<script nonce="he6qSVFoCPoA6tmtr4ukHwvEHmd4KfMeKhpbT69SDStTp4nu" src="/static/v20260714.1/extensions/FlagTypeComment/web/js/ftc.js"></script></div> 
</main> 
</div> 


</body>
</html>