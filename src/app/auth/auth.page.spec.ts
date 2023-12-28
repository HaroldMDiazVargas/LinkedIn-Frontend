import { Router } from "@angular/router";
import { ISignup, User } from "./models";
import { AuthService } from "./services/auth.service";
import { AuthPage } from "./auth.page";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { of } from "rxjs";
import { FormsModule, NgForm } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";



describe('AuthPage', () => {
    let httpClientSpy: { post: jasmine.Spy };
    let routerService: Router;
    let component: AuthPage;
    let fixture: ComponentFixture<AuthPage>;

    const mockNewUser: ISignup = {
        email: 'email@gmail.com',
        password: 'password',
        firstName: 'firstName',
        lastName: 'lastName'
    };

    const mockUser: User = {
        id: 1,
        firstName: mockNewUser.firstName,
        lastName: mockNewUser.lastName,
        email: mockNewUser.email,
        role: 'user',
        imagePath: null,
        posts: null
    }

    const mockAuthService: Partial<AuthService> = {
        register: () => of(mockUser),
        login: () => of(mockUser)
    }


    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);

        routerService = jasmine.createSpyObj('Router', {
           navigate: {} 
        }); 


            TestBed.configureTestingModule({
                imports: [FormsModule, IonicModule ],
                // declarations: [AuthPage],
                providers: [
                    {
                        provide: Router, useValue: routerService
                    },
                    {
                        provide: HttpClient, useValue: httpClientSpy
                    },
                    {
                        provide: AuthService, useValue: mockAuthService
                    }
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }).compileComponents();

            fixture = TestBed.createComponent(AuthPage);
            component = fixture.componentInstance;
            fixture.detectChanges();

            component.form = {
                value: mockNewUser
            } as NgForm;
            fixture.detectChanges();

        
    })

    describe('register', () => {
        it('should create with form values', waitForAsync(() => {
            fixture.whenStable().then(() => {
                expect(component).toBeTruthy();
                expect(component.form.value).toEqual(mockNewUser);
            })
        }));

        it('should have initial submission type of login', () => {
            expect(component.submissionType).toEqual('login')
        });

        it('should route to home page upon login', () => {
            expect(component.submissionType).toEqual('login');
            component.onSubmit();

            const spy = routerService.navigate as jasmine.Spy;
            const navArgs = spy.calls.first().args[0];

            expect(navArgs).toEqual(['/private'])

        });

        it('should toggle submission type to login after register', () => {
            expect(component.submissionType).toEqual('login');
            component.toggleText();
            expect(component.submissionType).toEqual('join');
            component.onSubmit();
            expect(component.submissionType).toEqual('login');

        });
    })

})