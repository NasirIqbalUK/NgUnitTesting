import { HeroesComponent } from './heroes.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Component, Input } from '@angular/core';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';
import { HeroComponent } from '../hero/hero.component';

describe('HerosComponent (deep tests)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;



    beforeEach(() => {

        HEROES = [
            {id: 1, name: 'SpiderDude', strength: 8},
            {id: 2, name: 'Wonderful Woman', strength: 24},
            {id: 3, name: 'SuperDude', strength: 55}
        ];

        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                HeroComponent
            ],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HeroesComponent);

    });

    it('should render each hero as a HeroComponent', () => {

        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        // run ngOnInit
        fixture.detectChanges();

        const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(heroComponentDEs.length).toEqual(3);
        // expect(heroComponentDEs[0].componentInstance.hero.name).toEqual('SpiderDude');
        for (let i = 0; i < heroComponentDEs.length; i++) {
            expect(heroComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
        }
    });

    it(`should call heroService.deleteHero when the Hero Component's
        delete button is clicked`, () => {
            spyOn(fixture.componentInstance, 'delete');
            mockHeroService.getHeroes.and.returnValue(of(HEROES));

            // run ngOnInit
            fixture.detectChanges();

            const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
            /* heroComponents[0].query(By.css('button'))
                .triggerEventHandler('click', {stopPropagation: () => {}}); */

            // Alternate way of raising an event instead of actual triggering click event through DOM
            (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);

            expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
        });
});
