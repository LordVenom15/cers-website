import java.sql.*;
import java.util.Scanner;

public class Main {
    static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        try {
            Class.forName("org.sqlite.JDBC");
            Connection conn = DriverManager.getConnection("jdbc:sqlite:users.db");

            String createTable = "CREATE TABLE IF NOT EXISTS users (" +
                                 "id INTEGER PRIMARY KEY AUTOINCREMENT," +
                                 "username TEXT UNIQUE," +
                                 "email TEXT," +
                                 "password TEXT," +
                                 "phone TEXT," +
                                 "address TEXT," +
                                 "gender TEXT," +
                                 "age INTEGER)";
            Statement stmt = conn.createStatement();
            stmt.execute(createTable);

            while (true) {
                System.out.println("\n1. Sign Up\n2. Login\n3. Edit Profile\n4. Exit");
                System.out.print("Choose: ");
                int choice = Integer.parseInt(sc.nextLine());

                if (choice == 1) {
                    signup(conn);
                } else if (choice == 2) {
                    login(conn);
                } else if (choice == 3) {
                    editProfile(conn);
                } else {
                    break;
                }
            }

            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void signup(Connection conn) throws SQLException {
        System.out.print("Username: ");
        String username = sc.nextLine();
        System.out.print("Email: ");
        String email = sc.nextLine();
        System.out.print("Password: ");
        String password = sc.nextLine();

        String sql = "INSERT INTO users(username, email, password) VALUES (?, ?, ?)";
        PreparedStatement ps = conn.prepareStatement(sql);
        ps.setString(1, username);
        ps.setString(2, email);
        ps.setString(3, password);

        try {
            ps.executeUpdate();
            System.out.println("Signup successful.");
        } catch (SQLException e) {
            System.out.println("Username already exists.");
        }
    }

    public static void login(Connection conn) throws SQLException {
        System.out.print("Username: ");
        String username = sc.nextLine();
        System.out.print("Password: ");
        String password = sc.nextLine();

        String sql = "SELECT * FROM users WHERE username=? AND password=?";
        PreparedStatement ps = conn.prepareStatement(sql);
        ps.setString(1, username);
        ps.setString(2, password);
        ResultSet rs = ps.executeQuery();

        if (rs.next()) {
            System.out.println("Login successful. Welcome, " + username + "!");
        } else {
            System.out.println("Invalid credentials.");
        }
    }

    public static void editProfile(Connection conn) throws SQLException {
        System.out.print("Username: ");
        String username = sc.nextLine();

        String checkSql = "SELECT * FROM users WHERE username=?";
        PreparedStatement checkPs = conn.prepareStatement(checkSql);
        checkPs.setString(1, username);
        ResultSet rs = checkPs.executeQuery();

        if (!rs.next()) {
            System.out.println("User not found.");
            return;
        }

        System.out.print("New Phone: ");
        String phone = sc.nextLine();
        System.out.print("New Address: ");
        String address = sc.nextLine();
        System.out.print("New Gender: ");
        String gender = sc.nextLine();
        System.out.print("New Age: ");
        int age = Integer.parseInt(sc.nextLine());

        String updateSql = "UPDATE users SET phone=?, address=?, gender=?, age=? WHERE username=?";
        PreparedStatement ps = conn.prepareStatement(updateSql);
        ps.setString(1, phone);
        ps.setString(2, address);
        ps.setString(3, gender);
        ps.setInt(4, age);
        ps.setString(5, username);

        ps.executeUpdate();
        System.out.println("Profile updated.");
    }
}
