import { TestBed } from "@angular/core/testing";
import { ISignup, User } from "../models";
import { AuthService } from "./auth.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { of, throwError } from "rxjs";
import { Router } from "@angular/router";


describe('AuthService', () => {
    let authService: AuthService;
    let httpClientSpy: { post: jasmine.Spy };
    let routerService: Router;

    const mockUser: ISignup = {
        email: 'email@gmail.com',
        password: 'password',
        firstName: 'firstName',
        lastName: 'lastName'
    }


    beforeEach(() => {
        // httpClient = jasmine.createSpyObj('HttpClient', {
        //     post: of({}),
        //     get: of({}),
        // });
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);

        routerService = jasmine.createSpyObj('Router', {
           navigate: {} 
        });        

        authService = new AuthService(httpClientSpy as any, routerService);
        
    })

    describe('register', () => {


        it('should return the user', (done: DoneFn) => {
            const expectedUser: User = {
                id: 1,
                firstName: 'firstName',
                lastName: 'lastName',
                email: 'email@gmail.com',
                role: 'user',
                imagePath: null,
                posts: null
            }
            

            httpClientSpy.post.and.returnValue(of(expectedUser));

            authService.register(mockUser).subscribe((user: User) => {
                expect(typeof user.id).toEqual('number');
                expect(user.firstName).toEqual(mockUser.firstName);
                expect(user.lastName).toEqual(mockUser.lastName);
                expect(user.email).toEqual(mockUser.email);
                expect((user as any).password).toBeUndefined();
                expect(user.role).toEqual('user');
                expect(user.imagePath).toBeNull();
                expect(user.posts).toBeNull();
                done();
            }) 
            expect(httpClientSpy.post.calls.count()).toBe(1)
            
        })

        it('should return an error if email already exists', (done: DoneFn) => {
            const errorResponse = new HttpErrorResponse({
                error: 'A user had already been created with this email address',
                status: 400
            });

            httpClientSpy.post.and.returnValue(throwError(() => errorResponse));
            authService.register(mockUser).subscribe({
                next: () => {
                    done.fail('expected a bad req error')                                           //Done but fail the test
                },
                error: (httpErrorResponse: HttpErrorResponse) => {
                    expect(httpErrorResponse.error).toContain('already been created');
                    done()
                }
            })
        })
    })

})