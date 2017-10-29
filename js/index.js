'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
   _inherits(App, _React$Component);

   function App(props) {
      _classCallCheck(this, App);

      var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

      _this.root = 'https://fcctop100.herokuapp.com/api/fccusers/top/';
      _this.allTime = 'alltime';
      _this.recent = 'recent';

      _this.state = { data: null,
         url: _this.root + _this.allTime,
         isUrlAlltime: true
      };
      _this.changeUrl = _this.changeUrl.bind(_this);
      _this.changeUrlAlltime = _this.changeUrlAlltime.bind(_this);
      return _this;
   }

   App.prototype.fetchData = function fetchData() {
      var _this2 = this;

      fetch(this.state.url).then(function (response) {
         return response.json();
      }).then(function (responseJson) {
         _this2.setState({ data: responseJson });
      });
   };

   App.prototype.componentDidMount = function componentDidMount() {
      this.fetchData();
   };

   App.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
      if (prevState.url != this.state.url) {
         this.fetchData();
      }
   };

   App.prototype.changeUrl = function changeUrl() {
      this.setState({
         url: this.root + this.recent,
         isUrlAlltime: false
      });
   };

   App.prototype.changeUrlAlltime = function changeUrlAlltime() {
      this.setState({
         url: this.root + this.allTime,
         isUrlAlltime: true
      });
   };

   App.prototype.render = function render() {
      return React.createElement(
         'div',
         { id: 'container' },
         React.createElement(Head, null),
         React.createElement(TableOfContents, { changeUrl: this.changeUrl, changeUrlAlltime: this.changeUrlAlltime, isUrlAlltime: this.state.isUrlAlltime }),
         React.createElement(Tables, { data: this.state.data })
      );
   };

   return App;
}(React.Component);

var Head = function Head(props) {
   return React.createElement(
      'div',
      { className: 'head' },
      React.createElement(
         'span',
         null,
         'freeCodeCamp Leaderboard'
      )
   );
};

var TableOfContents = function TableOfContents(props) {
   var backgroundForAlltime = { background: props.isUrlAlltime ? 'linear-gradient(to right bottom, rgba(88,173,234,1), rgba(97,110,175,1))' : 'rgba(245,248,252,1)' };
   var backgroundForRecent = { background: props.isUrlAlltime ? 'rgba(245,248,252,1)' : 'linear-gradient(to right bottom, rgba(88,173,234,1), rgba(97,110,175,1))' };
   var arrow = props.isUrlAlltime ? '' : '↓';
   var arrowForAlltime = props.isUrlAlltime ? '↓' : '';
   return React.createElement(
      'div',
      { className: 'tableOfContents' },
      React.createElement(
         'tr',
         { className: 'headers' },
         React.createElement(
            'td',
            null,
            '#'
         ),
         React.createElement(
            'td',
            { id: 'special' },
            'Camper Name'
         ),
         React.createElement(
            'td',
            { onClick: props.changeUrl, style: backgroundForRecent },
            'Past month',
            arrow
         ),
         React.createElement(
            'td',
            { onClick: props.changeUrlAlltime, style: backgroundForAlltime },
            'All time points',
            arrowForAlltime
         )
      )
   );
};

var Tables = function Tables(props) {
   if (!props.data) return React.createElement(
      'p',
      null,
      'Loading...'
   );
   return React.createElement(
      'div',
      { className: 'tables' },
      props.data.map(function (d, i) {
         return React.createElement(
            'tr',
            { id: 'table' + i },
            React.createElement(
               'td',
               { 'class': 'rankNumbers' },
               i + 1
            ),
            React.createElement(
               'td',
               null,
               React.createElement('img', { src: d.img })
            ),
            React.createElement(
               'td',
               null,
               JSON.stringify(d.username).replace(/"/g, '')
            ),
            React.createElement(
               'td',
               null,
               JSON.stringify(d.recent)
            ),
            React.createElement(
               'td',
               null,
               JSON.stringify(d.alltime)
            )
         );
      })
   );
};

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));