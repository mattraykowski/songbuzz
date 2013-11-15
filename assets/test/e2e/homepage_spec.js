describe("songbuzz homepage", function () {
    describe("while logged out", function() {
        it("should render the login path", function () {
            browser.get("http://localhost:1337");

            expect(browser.getCurrentUrl()).toBe("http://localhost:1337/login");
        });

        it("should render helpful text", function() {
            // TODO
        });

        it("should login when the login button is clicked", function() {
            var ptor = protractor.getInstance();

            // Call the Passport Google Auth
            ptor.driver.get("http://localhost:1337/auth/google");

            // Wait half a sec as it bounces us to Google.
            ptor.driver.sleep(1000);

            // Login - NOTE requires GP_EMAIL and GP_PASSWD be set as environment variables.
            ptor.driver.findElement(protractor.By.id("Email")).sendKeys(process.env.GP_EMAIL);
            ptor.driver.findElement(protractor.By.id("Passwd")).sendKeys(process.env.GP_PASSWD);
            ptor.driver.findElement(protractor.By.id("signIn")).click();

            // Wait again for the inevitable access request page.
            ptor.driver.sleep(1000);
            ptor.driver.findElement(protractor.By.id("submit_approve_access")).click();
            ptor.driver.sleep(5000);

            expect(ptor.driver.getCurrentUrl()).toBe("http://localhost:1337/#/playlists");
//        element(by.className("Email"))
            // find Email and Passwd
        });
    });

    describe("while logged in", function() {
        it("should render the playlists path", function () {
            browser.get("http://localhost:1337");

            expect(browser.getCurrentUrl()).toBe("http://localhost:1337/#/playlists");
        });

        it("should show the current user menu", function() {
            //TODO
        })
    });









//  describe('todo list', function() {
//    var todoList;
//
//    beforeEach(function() {
//      browser.get('http://www.angularjs.org');
//
//      todoList = element.all(by.repeater('todo in todos'));
//    });
//
//    it('should list todos', function() {
//      expect(todoList.count()).toEqual(2);
//      expect(todoList.get(1).getText()).toEqual('build an angular app');
//    });
//
//    it('should add a todo', function() {
//      var addTodo = element(by.model('todoText'));
//      var addButton = element(by.css('[value="add"]'));
//
//      addTodo.sendKeys('write a protractor test');
//      addButton.click();
//
//      expect(todoList.count()).toEqual(3);
//      expect(todoList.get(2).getText()).toEqual('write a protractor test');
//    });
//  });
});
