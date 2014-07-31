techanModule('plot/axisannotation', function(specBuilder) {
  'use strict';

  var techan = require('../../../../src/techan'),
      domFixtures = require('../_fixtures/dom'),
      spies = { g: { parentNode: {} }, plot: {} },
      axisannotation,
      g;

  var actualInit = function() {
    return techan.plot.axisannotation;
  };

  var mockInit = function(axisannotation) {
    return axisannotation(d3.svg.axis, spies.plot);
  };

  specBuilder.require(require('../../../../src/plot/axisannotation'), function(instanceBuilder) {
    instanceBuilder.instance('actual', actualInit, function(scope) {
      describe('And axisannotation is initialised with defaults', function () {
        beforeEach(function () {
          axisannotation = scope.plot;
          g = domFixtures.g([{ value: 50 }]);
        });

        it('Then on default invoke, it should render without error', function() {
          axisannotation(g);
          expect(g[0][0].innerHTML).not.toContain('NaN');
        });

        it('Then on refresh invoke, it should be refreshed only', function() {
          axisannotation(g);
          axisannotation.refresh(g);
          expect(g[0][0].innerHTML).not.toContain('NaN');
        });
      });
    });

    instanceBuilder.instance('mocked', mockInit, function(scope) {
      describe('And axisannotation is initialised with defaults', function () {
        beforeEach(function () {
          axisannotation = scope.plot;
          g = domFixtures.g([{ value: 50 }]);
        });

        describe('And selection is mocked', function() {
          var selectSpies = {};

          beforeEach(function() {
            // Too many spies?
            spies.plot.groupSelect = jasmine.createSpy('groupSelect');
            spies.plot.groupSelect.and.returnValue({entry: selectSpies, selection: selectSpies});
            spies.g.selectAll = jasmine.createSpy('selectAll');
            spies.g.selectAll.and.returnValue(selectSpies);
            spies.g.select = jasmine.createSpy('select');
            spies.g.select.and.returnValue(selectSpies);
            selectSpies.selectAll = spies.g.selectAll;
            selectSpies.append = jasmine.createSpy('append');
            selectSpies.append.and.returnValue(selectSpies);
            selectSpies.attr = jasmine.createSpy('attr');
            selectSpies.attr.and.returnValue(selectSpies);
            selectSpies.text = jasmine.createSpy('text');
            selectSpies.text.and.returnValue(selectSpies);
            selectSpies.style = jasmine.createSpy('style');
            selectSpies.call = jasmine.createSpy('call');
          });

          describe('And axis is left', function() {
            beforeEach(function() {
              axisannotation.axis().orient('left');
              axisannotation.refresh(spies.g);
            });

            it('Then path attribute function should be passed', function() {
              expect(selectSpies.attr.calls.argsFor(0)[1]).toBeDefined();
            });

            it('Then path attribute function execution should generate correct path', function() {
              expect(selectSpies.attr.calls.argsFor(0)[1]({value:1})).toEqual('M 0 1 l -6 -4 l 0 -3 l -50 0 l 0 14 l 50 0 l 0 -3');
            });
          });

          describe('And axis is right', function() {
            beforeEach(function() {
              axisannotation.axis().orient('right');
              axisannotation.refresh(spies.g);
            });

            it('Then path attribute function should be passed', function() {
              expect(selectSpies.attr.calls.argsFor(0)[1]).toBeDefined();
            });

            it('Then path attribute function execution should generate correct path', function() {
              expect(selectSpies.attr.calls.argsFor(0)[1]({value:1})).toEqual('M 0 1 l 6 -4 l 0 -3 l 50 0 l 0 14 l -50 0 l 0 -3');
            });
          });

          describe('And axis is top', function() {
            beforeEach(function() {
              axisannotation.axis().orient('top');
              axisannotation.refresh(spies.g);
            });

            it('Then path attribute function should be passed', function() {
              expect(selectSpies.attr.calls.argsFor(0)[1]).toBeDefined();
            });

            it('Then path attribute function execution should generate correct path', function() {
              expect(selectSpies.attr.calls.argsFor(0)[1]({value:1})).toEqual('M 1 0 l -4 -6 l -21 0 l 0 -14 l 50 0 l 0 14 l -21 0');
            });
          });

          describe('And axis is bottom', function() {
            beforeEach(function() {
              axisannotation.axis().orient('bottom');
              axisannotation.refresh(spies.g);
            });

            it('Then path attribute function should be passed', function() {
              expect(selectSpies.attr.calls.argsFor(0)[1]).toBeDefined();
            });

            it('Then path attribute function execution should generate correct path', function() {
              expect(selectSpies.attr.calls.argsFor(0)[1]({value:1})).toEqual('M 1 0 l -4 6 l -21 0 l 0 14 l 50 0 l 0 -14 l -21 0');
            });
          });
        });
      });
    });
  });
});